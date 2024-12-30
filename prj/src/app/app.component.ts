import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceService } from './shared/service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'prj';
  isUserLogged: boolean = false;
  constructor(private router: Router, private service: ServiceService) {
    this.service.userCheck$.subscribe((bool) => {
      this.isUserLogged = bool;
    });
  }
  ngOnInit() {}
  navbarClick() {
    this.router.navigate(['/login']);
  }
}
