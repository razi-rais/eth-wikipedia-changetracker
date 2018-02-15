import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
