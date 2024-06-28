import { Injectable } from '@angular/core';

interface CardInterface {
  img: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public getCatalogBlocks() {
    return fetch('https://testproject-622c5-default-rtdb.firebaseio.com/CATALOG.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return 'Ошибка при получении данных из Firebase: ' + response.status;
        }
      })
      .then(data => {
        return data;
      });
  }

  public sendCardToServer(id: number, card: CardInterface) {
    fetch('https://testproject-622c5-default-rtdb.firebaseio.com/CATALOG/' + id + '.json', {
      method: 'PUT',
      body: JSON.stringify(card)
      })
  }
}
