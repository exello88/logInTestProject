import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { CatalogService } from '../catalog.service';

interface CardInterface {
  id: number;
  img: string;
  name: string;
  price: number;
}

interface CardResponseInterface {
  img: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-catalog-field',
  templateUrl: './catalog-field.component.html',
  styleUrl: './catalog-field.component.css'
})
export class CatalogFieldComponent {
  @Input() authStatus !: boolean;
  @Input() cards !: CardInterface[];
  @ViewChildren('inputNameProduct') private inputNameProductRef !: QueryList<ElementRef>;
  @ViewChildren('inputPriceProduct') private inputPriceProductRef !: QueryList<ElementRef>;
  @ViewChildren('inputImgProduct') private inputImgProductRef !: QueryList<ElementRef>;
  private currentId: number = 0;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.catalogService.getCatalogBlocks()
      .then(data => this.drawingCatalogBlock(data));
  }

  drawingCatalogBlock(response: { [key: string]: CardResponseInterface | null }) {
    Object.keys(response).forEach(cardID => {
      if(this.currentId < +cardID) this.currentId = +cardID;
      console.log(this.currentId + 'ds' + cardID);
    });
    this.cards = Object.keys(response)
      .filter(key => response[key] !== null)
      .map(key => ({
        id: +key,
        ...response[key]!
      }));  
  }

  onDeleteCard(card: CardInterface) {
    fetch(`https://testproject-622c5-default-rtdb.firebaseio.com/CATALOG/${card.id}.json`, {
      method: 'DELETE'
    })
      .then(() => {
        this.cards = this.cards.filter(c => c.id !== card.id);
        console.log(this.cards);
      })
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
        this.cards.push(card);
      });
  }

  onAddProduct() {
    const nameProductValue = this.inputNameProductRef.first.nativeElement.value;
    const priceProductValue = this.inputPriceProductRef.first.nativeElement.value;
    const imgProductValue = this.inputImgProductRef.first.nativeElement.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const imageBytes = new Uint8Array(reader.result as ArrayBuffer);
      const bytesStr = imageBytes.join(' ');
      this.currentId = this.currentId + 1;
      const newCardForCatalog: CardInterface = {
        'id': this.currentId,
        'img': bytesStr,
        'name': nameProductValue,
        'price': priceProductValue
      };
      const newCardForService: CardResponseInterface = {
        'img': bytesStr,
        'name': nameProductValue,
        'price': priceProductValue
      };
      this.cards.push(newCardForCatalog);
      this.catalogService.sendCardToServer(this.currentId,newCardForService);
    };
    reader.readAsArrayBuffer(imgProductValue);
  }
}
