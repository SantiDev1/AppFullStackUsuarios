import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { FlowbiteserviceService } from './services/flowbiteservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEndUsuarios';
  
  constructor(private flowbiteService: FlowbiteserviceService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}