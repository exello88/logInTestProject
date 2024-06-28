import { Component, Input, Output, EventEmitter } from '@angular/core';

interface CardInterface {
  id: number;
  img: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.css'
})

export class CatalogCardComponent {
  @Input() authStatus !: boolean;
  @Input() card !: CardInterface;
  @Output() deleteCard = new EventEmitter<CardInterface>();
  public imageUrl !: string;

  ngOnInit() {
    console.log(this.card);
    const bytes = this.card.img.split(' ').map(Number);
    const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpg' });
    this.imageUrl = URL.createObjectURL(blob); 
  }

  onDeleteCard(){
    this.deleteCard.emit(this.card);
  }
}
