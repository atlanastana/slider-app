import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Slide {
  id: number;
  image: string;
  url: string;
  priority: number;
}

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private storageKey = 'currentSlideIndex';

  constructor() {
  }

  // Метод для имитации получения данных с API
  getSlides(): Observable<Slide[]> {
    const slides: Slide[] = [
      {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCxFF94mxXVV1d-nBmFoF44mR25mJ6RE1d5g&s',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCxFF94mxXVV1d-nBmFoF44mR25mJ6RE1d5g&s',
        priority: 1
      },
      {
        id: 2,
        image: 'https://upload.wikimedia.org/wikipedia/kk/3/32/%D0%90%D0%B1%D1%8B%D0%BB%D0%B0%D0%B9_%D1%85%D0%B0%D0%BD.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/kk/3/32/%D0%90%D0%B1%D1%8B%D0%BB%D0%B0%D0%B9_%D1%85%D0%B0%D0%BD.jpg',
        priority: 2
      },
      {
        id: 3,
        image: 'https://i.pinimg.com/736x/09/c2/19/09c2191604d1c7dfa408cf415461cb0c.jpg',
        url: 'https://i.pinimg.com/736x/09/c2/19/09c2191604d1c7dfa408cf415461cb0c.jpg',
        priority: 1
      }
    ];
    return of(slides);
  }

  // Метод для сохранения текущего индекса слайда в localStorage
  saveCurrentSlideIndex(index: number): void {
    localStorage.setItem(this.storageKey, index.toString());
  }

  // Метод для получения текущего индекса слайда из localStorage
  getCurrentSlideIndex(): number {
    const savedIndex = localStorage.getItem(this.storageKey);
    return savedIndex ? +savedIndex : 0;
  }

  // Метод для обновления URL с текущим индексом слайда
  updateURLWithSlideIndex(index: number): void {
    const url = new URL(window.location.href);
    url.searchParams.set('currentSlideIndex', index.toString());
    window.history.replaceState({}, '', url.toString());
  }

  // Метод для получения индекса слайда из URL
  getSlideIndexFromURL(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const savedIndex = urlParams.get('currentSlideIndex');
    return savedIndex ? +savedIndex : 0;
  }
}
