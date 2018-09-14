import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { QuestionDirective} from '../question.directive';
import { AdComponents } from '../adComponent';
import { QuestionModel } from '../questionModule';
import { PlayerService } from '../player.service';
import { McqComponent} from '../mcq/mcq.component';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questionComponents: AdComponents[];
  @ViewChild(QuestionDirective) questionHost: QuestionDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,private playerService: PlayerService, private activatedRoute: ActivatedRoute) { }
  userId: number;
  domainName: string;
  // timer: any = null;
  // startTime: Date;
  // endTime: Date;
  // ellapsedTime = '00:00';
  // duration = '';

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let d = params.get('domain');
      this.domainName = d;
    });

    this.playerService
      .getQuestionStream()
      .subscribe(
        question => this.question = question,
        error => console.log(error)
      );

      // this.startTime = new Date();
      // this.timer = setInterval(() => { this.tick(); }, 1000);
      // this.duration = this.parseTime(10);
  }

  // tick() {
  //   const now = new Date();
  //   const diff = (now.getTime() - this.startTime.getTime()) / 1000;
  //   if (diff >= 10) {
  //     this.endQuiz();
  //   }
  //   this.ellapsedTime = this.parseTime(diff);
  // }

  // parseTime(totalSeconds: number) {
  //   let mins: string | number = Math.floor(totalSeconds / 60);
  //   let secs: string | number = Math.round(totalSeconds % 60);
  //   mins = (mins < 10 ? '0' : '') + mins;
  //   secs = (secs < 10 ? '0' : '') + secs;
  //   return `${mins}:${secs}`;
  // }
  question : QuestionModel;

  onResponseReceived(response) {
    this.question.userResponse = response;
  }

  getNextQuestion() {
    return this.playerService.getNextQuestion(this.question);
    // this.loadComponent();
  }

  endQuiz() {
    //this.playerService.sendResponse(this.question);
    console.log("inside end quiz of player component");
    //this.playerService.shuffleArray(this.numbers);
    return this.playerService.endQuiz(this.question);

  }

  //numbers = [1,2,3,4,5,6,7,8,9,0];



  // loadComponent() {

  //   console.log("printiing question compoennt"+this.questionComponents);
  //   let adItem = this.questionComponents[0];
  //   //this.count++;
  //   //console.log("inside load component" + adItem.component);
  //   let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

  //   let viewContainerRef = this.questionHost.viewContainerRef;
  //   viewContainerRef.clear();

  //   let componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<AdComponents>componentRef.instance).data = this.question;
  // }

}


