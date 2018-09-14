import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { NgModule } from '@angular/core';

@NgModule({
imports: [MatButtonModule, MatCardModule],
exports: [MatButtonModule, MatCardModule],
})
export class MaterialModule { }
