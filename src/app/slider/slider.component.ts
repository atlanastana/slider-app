import {Component, OnInit, Input} from '@angular/core';
import {Slide, SliderService} from '../BLL/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() displayTime = 3000; // Время отображения слайда (по умолчанию 3 секунды)
  @Input() slideWidth: number = 300; // Ширина слайда
  @Input() slideHeight: number = 300; // Высота слайда

  slides: Slide[] = [];
  currentSlideIndex = 0;

  constructor(private sliderService: SliderService) {
  }

  ngOnInit(): void {
    this.sliderService.getSlides().subscribe(slides => {
      // Сортируем слайды по приоритету
      this.slides = slides.sort((a, b) => b.priority - a.priority);

      // Восстанавливаем индекс слайда либо из URL, либо из localStorage
      this.currentSlideIndex = this.sliderService.getSlideIndexFromURL() || this.sliderService.getCurrentSlideIndex();

      this.startSlider();
    });
  }

  startSlider(): void {
    setInterval(() => {
      this.nextSlide();

      // Сохраняем текущий индекс слайда в localStorage и обновляем URL
      this.sliderService.saveCurrentSlideIndex(this.currentSlideIndex);
      this.sliderService.updateURLWithSlideIndex(this.currentSlideIndex);
    }, this.displayTime);
  }

  // Метод для обработки клика по слайду
  onSlideClick(slide: Slide): void {
    window.open(slide.url, '_blank');
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }
}
