import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';


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
  lang: string = 'pl'
  langData = {
    pl: {
      header:{
        home: 'Strona główna',
        about: 'O mnie',
        projects: 'Projekty', 
        contact: 'Kontakt'
      },
      sectionHome:{
        firstLine: 'Cześć, jestem Adam',
      },
      sectionAbout:{
        caption: 'O mnie',
        desription: 'Nazywam się Adam i mam 22 lata. Jestem aspirującym programistą, który od momentu otrzymania pierwszego komputera z pasją rozwija swoje umiejętności w świecie technologii. Na początku mojej przygody z programowaniem zafascynowało mnie tworzenie gier. Postanowiłem stworzyć przygodową platformówkę z ciekawą fabułą i nietuzinkową grafiką, mimo praktycznie zerowego budżetu. W tym celu rozpocząłem naukę C#, ponieważ pierwszym silnikiem, z jakim się zetknąłem, był Unity. Niestety, z czasem zaczęło brakować czasu i rąk do pracy, zwłaszcza w dziedzinie model designu, więc projekt został porzucony. Moim największym marzeniem jest zdobycie środków na dokończenie tego projektu, który uważam za projekt "życia". Później przerzuciłem się na mniej ambitne projekty, takie jak gry mobilne. W gimnazjum zacząłem interesować się web developingiem i ta pasja trwa do dziś. Obecnie koncentruję się na nauce frameworka Angulara i biblioteki Reacta. Mimo że wiele moich projektów nie ma dokumentacji z powodu zaniedbania prowadzenia GitHuba, staram się to nadrobić i udowodnić, że moją główną motywacją jest pasja.',
        knowladge: 'Umiejętności'
      },
      sectionProjects:{
        caption: 'Moje projekty',
        projects:{
        }
        }
    },
    en: {

    }
  }
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
changelang(){

}
  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }
}
