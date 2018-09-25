import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { QuestionDirective} from '../question.directive';
import { AdComponents } from '../adComponent';
import { QuestionModel } from '../questionModule';
import { PlayerService } from '../player.service';
import { McqComponent} from '../mcq/mcq.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdItem } from '../ad-item';
import { FillInTheBlanksComponent } from '../fill-in-the-blanks/fill-in-the-blanks.component';
import { LocalStorageService } from 'ngx-webstorage';
import { MCQModel } from '../MCQModel';
import { MMCQModel } from '../MMCQModel';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questionComponents: AdItem[];
  @ViewChild(QuestionDirective) questionHost: QuestionDirective;
  public full = true;
  public half = false;
  public empty = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private playerService: PlayerService, private activatedRoute: ActivatedRoute, private router: Router, private localStorage: LocalStorageService) { }
  userId: number;
  domainName: string;
  count: number;
  progress: number;
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  questionType: string;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;
      this.count = 1;
      this.progress = 10;
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let domain = params.get('domain');
      this.domainName = domain;
    });

    this.playerService
      .getQuestionStream()
      .subscribe(
        question => {
          this.question = question;
          this.loadComponent(this.question);
        },
        error => console.log(error)
      );
      this.questionComponents = this.playerService.getComponents();

      // console.log("all the dwie " + this.questionComponents[1].component);
    this.startTime = new Date();
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.duration = this.parseTime(600);
    console.log(this.questionComponents);
  }


  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= 600 && diff < 601) {
      this.endQuiz();
    }
    this.ellapsedTime = this.parseTime(diff);
    const endTime = this.ellapsedTime.split(":",2);
    const minutes = +endTime[0];
    if(minutes > 4)
    {
      this.half= true;
      this.full = false;
    }
    if(minutes > 7){
      this.half = false;
      this.empty= true;
    }
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }
  question: any;
  mcqQuestion: MCQModel;
  mmcqQuestion: MMCQModel;

  onResponseReceived(response) {
    console.log("this is the user response " + response);
    this.question.userResponse = response;
  }

  getNextQuestion() {

      console.log("Testing ", this.localStorage.retrieve("response"));
      this.questionType = this.question["questionType"];
      console.log("PRINTING " + this.questionType);
      this.count = this.count + 1;
      this.progress = this.progress + 10;
      switch(this.questionType) {
        case "MCQ":
        {
        this.mcqQuestion.response = this.localStorage.retrieve("response");
        console.log("PRINTING " + JSON.stringify(this.mcqQuestion));

        return this.playerService.getNextQuestion(this.mcqQuestion);
        }

        case "MMCQ":
        {
        this.mmcqQuestion.response = this.localStorage.retrieve("response");
        return this.playerService.getNextQuestion(this.mmcqQuestion);
        }
      }


      // this.loadComponent();

    // console.log("Testing ", this.localStorage.retrieve("response"));
    // this.question.userResponse = this.localStorage.retrieve("response");
    // console.log("this is the response attachde " , this.question.userResponse);
    // this.count = this.count + 1;
    // this.progress = this.progress + 10;
    //  return this.playerService.getNextQuestion(this.question).then(()=>this.loadComponent(this.question));
    // // this.loadComponent();
  }

  endQuiz() {
    //this.playerService.sendResponse(this.question);
    console.log("inside end quiz of player component");
    this.question.userResponse = this.localStorage.retrieve("response");
    // this.router.navigate(['result/abcd']);
    return this.playerService.endQuiz(this.question);

  }

  loadComponent(question:any) {
    let adItem;
   this.questionType = question["questionType"];
   console.log("INSIDE LOAD COMPONENT " + this.questionType);
   switch(this.questionType) {
     case "MCQ":
     {
     this.mcqQuestion = question;
     adItem = this.questionComponents[0];
     let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
     let viewContainerRef = this.questionHost.viewContainerRef;
     viewContainerRef.clear();
     let componentRef = viewContainerRef.createComponent(componentFactory);
     (<AdComponents>componentRef.instance).question = this.mcqQuestion;
     }
     break;
     case "MMCQ":
     {
     this.mmcqQuestion = question;
     adItem = this.questionComponents[0];
     let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
     let viewContainerRef = this.questionHost.viewContainerRef;
     viewContainerRef.clear();
     let componentRef = viewContainerRef.createComponent(componentFactory);
     (<AdComponents>componentRef.instance).question = this.mmcqQuestion;
     }
     break;

   }
   // if(question.questionType == "MCQType")
   // {
   //    adItem = this.questionComponents[0];
   // }
   // else {
   //    adItem = this.questionComponents[1];
   // }


 }

}
