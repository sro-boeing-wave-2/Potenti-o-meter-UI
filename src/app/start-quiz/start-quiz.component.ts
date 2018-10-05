import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  userId: number;
  domain: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {

    console.log("inside start");
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.userId = id;

    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let d = params.get('domain');
      this.domain = d;
    });
  }
  startQuiz() {
    this.playerService.startQuiz(this.userId, this.domain);
    console.log("inside start method file");
    //this.playerService.onConnectionMapping(this.userId);

    this.router.navigate(['/player', this.userId])


  }
}

