import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

import { QuestionmcqComponent } from './questionmcq/questionmcq.component';
import { NewResultHistoryComponent } from './new-result-history/new-result-history.component';
import { ResultdomainComponent } from './resultdomain/resultdomain.component';
import { QuizInDomainComponent } from './quiz-in-domain/quiz-in-domain.component';

import { AuthguardGuard, CanDeactivateGuard } from './authguard.guard';
import { NewResultComponent } from './result/new-result.component';
import { NewUserProfileComponent } from './new-user-profile/new-user-profile.component';

const routes: Routes = [
  { path: '',redirectTo: 'home',  pathMatch: 'full'},
  { path: 'quizresult/:quizId', component: NewResultComponent , canActivate:[AuthguardGuard]},
  { path:'start/:id/:domain', component:StartQuizComponent , canActivate:[AuthguardGuard]},
  { path:'player/:id', component:PlayerComponent, canActivate:[AuthguardGuard], canDeactivate: [CanDeactivateGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthguardGuard]},
  { path: 'new/dashboard', component: NewUserProfileComponent },
  // { path: 'quizresult/:quizId', component: ResultComponent, canActivate:[AuthguardGuard]},
  { path: 'question',component: QuestionmcqComponent, canActivate:[AuthguardGuard]},

  { path: 'quizresult/:id/:domain', component:NewResultHistoryComponent, canActivate:[AuthguardGuard]},
  // {path: 'resultdomain/:userId',component : ResultdomainComponent, canActivate:[AuthguardGuard]},
  // {path :'domainWisequiz/:userId/:domainName',component : QuizInDomainComponent , canActivate:[AuthguardGuard]},

  // { path: 'quizresult/:id/:domain', component:ResultHistoryComponent, canActivate:[AuthguardGuard], canDeactivate: [CanDeactivateGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [PlayerComponent, StartQuizComponent];
