import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../shared/service.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private service: ServiceService) {}
  ngOnInit() {
    this.service.userCheck$.subscribe((bool) => {
      const isUserLogged = bool;
      if (!isUserLogged) this.router.navigate(['/login']);
    });
  }
}
