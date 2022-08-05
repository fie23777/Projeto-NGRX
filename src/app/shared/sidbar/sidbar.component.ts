import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {

  constructor(private serverLogin: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.serverLogin.logout();
  }

}
