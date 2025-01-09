import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../shared/service.service';
import { DAYSCHEDULE } from '../../model/dayScheduleM';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  firstDayOfWeek: number = 1;
  lastDayOfWeek: number = 7;
  weekData: DAYSCHEDULE[] = [];
  constructor(private router: Router, private service: ServiceService) {}
  ngOnInit() {
    this.service;
    this.CallingServiceForpagination(this.firstDayOfWeek, this.lastDayOfWeek);

    this.service.userCheck$.subscribe((bool) => {
      const isUserLogged = bool;
      if (!isUserLogged) this.router.navigate(['/login']);
    });
  }
  lastBtnClick() {
    if (this.firstDayOfWeek - 7 > 0) {
      this.firstDayOfWeek -= 7;
      this.lastDayOfWeek -= 7;
      this.CallingServiceForpagination(this.firstDayOfWeek, this.lastDayOfWeek);
    }
  }
  nextBtnClick() {
    if (this.lastDayOfWeek + 7 < 36) {
      this.firstDayOfWeek += 7;
      this.lastDayOfWeek += 7;
      this.CallingServiceForpagination(this.firstDayOfWeek, this.lastDayOfWeek);
    }
  }
  CallingServiceForpagination(first: number, last: number) {
    this.service
      .paginationScheduleData(first, last)
      .subscribe((days: DAYSCHEDULE[]) => {
        if (days) {
          this.weekData = days;
          // console.log(this.weekData);
          // console.log(this.weekData[0].worktype);
        }
      });
  }
  checkSecurity(worktype: any[], workname: string): any {
    return worktype.find((work) => work.name === workname) || null;
  }
}
