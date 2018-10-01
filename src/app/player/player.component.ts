import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { QuestionDirective} from '../question.directive';
import { AdComponents } from '../adComponent';
import { QuestionModel } from '../questionModule';
import { PlayerService } from '../player.service';
import { McqComponent} from '../mcq/mcq.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdItem } from '../ad-item';
import { PlatformLocation } from '@angular/common'
import { FillInTheBlanksComponent } from '../fill-in-the-blanks/fill-in-the-blanks.component';
import { LocalStorageService } from 'ngx-webstorage';
import { MCQModel, MCQOption } from '../MCQModel';
import { MMCQModel } from '../MMCQModel';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questionComponents: AdItem[];
  @ViewChild(QuestionDirective) questionHost: QuestionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private playerService: PlayerService, private activatedRoute: ActivatedRoute, private localStorage: LocalStorageService,
    private location: PlatformLocation, private router: Router) {
      location.onPopState(() => {
        var r = confirm("We detected a back button press. Do you want to submit the test ?");
        if (r == true) {
          this.playerService.exitQuestion();
          this.router.navigate(['dashboard']);
      }
    });
   }
   res: MCQOption;
  userId: number;
  domainName: string;
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  questionType : string;
  userResponse: any;
  count: number;
  progress: number;
  public full = true;
  public half = false;
  public empty = false;
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;
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
     this.count = 1;
     this.progress = 10;
     this.questionComponents = this.playerService.getComponents();
     this.startTime = new Date();
     this.timer = setInterval(() => { this.tick(); }, 1000);
     this.duration = this.parseTime(300);
  }
  question : any;
  mcqQuestion : MCQModel;
  mmcqQuestion : MMCQModel;
  onResponseReceived(response) {
    this.userResponse = response;
  }

  getNextQuestion() {
    this.questionType = this.question["questionType"];
    this.count = this.count + 1;
    this.progress = this.progress + 10;
    switch(this.questionType) {
      case "MCQ":
      {
        this.res = {
          raw: this.localStorage.retrieve("response"),
          optionText: this.localStorage.retrieve("response")
        };
        this.mcqQuestion.response = this.res;



      return this.playerService.getNextQuestion(this.mcqQuestion);
      }

      case "MMCQ":
      {
      this.mmcqQuestion.response = this.localStorage.retrieve("response");
      return this.playerService.getNextQuestion(this.mmcqQuestion);
      }
    }


    // this.loadComponent();
  }

  endQuiz() {
    this.questionType = this.question["questionType"];
    switch(this.questionType) {
      case "MCQ":
      {
        this.res = {
          raw: this.localStorage.retrieve("response"),
          optionText: null
        };
        this.mcqQuestion.response = this.res;
      return this.playerService.endQuiz(this.mcqQuestion);
      }

      case "MMCQ":
      {
      this.mmcqQuestion.response = this.localStorage.retrieve("response");
      return this.playerService.endQuiz(this.mmcqQuestion);
      }
    }


  }
  tick() {
      const now = new Date();
      const diff = (now.getTime() - this.startTime.getTime()) / 1000;
      if (diff >= 300 && diff< 301) {
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
