import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListusuariosComponent } from './components/Usuario/listusuarios/listusuarios.component';
import { CreateComponent } from './components/Usuario/create/create.component';
import { DetailsComponent } from './components/Usuario/details/details.component';
import { EditComponent } from './components/Usuario/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'listusuarios', component: ListusuariosComponent },
  { path: 'create', component: CreateComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
