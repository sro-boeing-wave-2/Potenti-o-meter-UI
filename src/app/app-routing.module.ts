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
import { ResultHistoryComponent } from './result-history/result-history.component';
import { ResultdomainComponent } from './resultdomain/resultdomain.component';
import { QuizInDomainComponent } from './quiz-in-domain/quiz-in-domain.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: '',redirectTo: 'home',  pathMatch: 'full'},
  {path:'start/:id/:domain', component:StartQuizComponent},
  {path:'player/:id', component:PlayerComponent},
  {  path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthguardGuard]},
  { path: 'quizresult/:quizId', component: ResultComponent },
  { path: 'question',component: QuestionmcqComponent},
  { path: 'quizresult/:id/:domain', component:ResultHistoryComponent},
  {path: 'resultdomain/:userId',component : ResultdomainComponent},
  {path :'domainWisequiz/:userId/:domainName',component : QuizInDomainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [PlayerComponent, StartQuizComponent];
