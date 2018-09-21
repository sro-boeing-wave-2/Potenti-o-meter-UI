import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { DomainComponent } from './domain/domain.component';
import { QuestionmcqComponent } from './questionmcq/questionmcq.component';

const routes: Routes = [
  { path: '',redirectTo: '/start:id/:domain',  pathMatch: 'full'},
  {path:'start/:id/:domain', component:StartQuizComponent},
  {path:'player/:id', component:PlayerComponent},
  {  path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'result/:quizId', component: ResultComponent },
  { path: 'app',component: DomainComponent},
  { path: 'question',component: QuestionmcqComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [PlayerComponent, StartQuizComponent];
