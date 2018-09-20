import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { PlayerComponent } from './player/player.component';
import { McqComponent } from './mcq/mcq.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatToolbarModule, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './/app-routing.module';
import { PlayerService } from './player.service';
import {MaterialModule} from '../materialmodule';
import { MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule} from '@angular/material/radio';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { HttpModule } from '@angular/http';
import { ResultComponent } from './result/result.component';
import { QuestionDirective } from './question.directive';
import { Ng2Webstorage } from 'ngx-webstorage';
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { ResultdomainComponent } from './resultdomain/resultdomain.component';




@NgModule({
  declarations: [
    AppComponent,
    StartQuizComponent,
    PlayerComponent,
    McqComponent,
    HeaderComponent,
    FooterComponent,
    UserLoginComponent,
    HomeComponent,
    UserSignUpComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardBodyComponent,
    ResultComponent,
    QuestionDirective,
    FillInTheBlanksComponent,
    ResultdomainComponent,

  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    HttpModule,
    MatRadioModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MaterialModule,
    Ng2Webstorage
  ],
  providers: [PlayerService, MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [UserLoginComponent,UserSignUpComponent,McqComponent,FillInTheBlanksComponent]
})
export class AppModule { }
