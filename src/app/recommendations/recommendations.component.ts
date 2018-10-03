import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  constructor() { }
  @Input() domain;
  ngOnInit() {
  }

}
