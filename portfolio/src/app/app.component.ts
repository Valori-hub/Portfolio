import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit, OnDestroy {
  private scrollListener: (() => void) | undefined;
  title = 'portfolio';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    AOS.init({
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false,
    });
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      const scrollY = window.scrollY;

      sections.forEach((sec) => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (id && scrollY >= offset && scrollY < offset + height) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(id)) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }
}
