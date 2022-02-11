import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Path of component
import { AdresseComponent } from './pages/signup/pages/adresse/adresse.component';
import { ObjectifComponent } from './pages/signup/pages/objectif/objectif.component';
import { ProfilComponent } from './pages/signup/pages/profil/profil.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DetailHaircutComponent } from './pages/detail-haircut/detail-haircut.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { BarberHomePageComponent } from './pages/barber-home-page/barber-home-page.component';

// All modules
import { HomePageModule } from './pages/home-page/home-page.module';
import { SignUpModule } from './pages/signup/signup.module';
import { BarberHomePageModule } from './pages/barber-home-page/barber-home-page.module';
import { ReservationDetailsPageComponent } from './pages/reservation-details-page/reservation-details-page.component';
import { LoginModule } from "./pages/login/login.module";
import { FooterModule } from "./pages/footer/footer.module";
import { ReservationDetailsPageModule } from "./pages/reservation-details-page/reservation-details-page.module";
import { DetailHaircutModule } from "./pages/detail-haircut/detail-haircut.module";
import { MyProfileModule } from "./pages/my-profile/my-profile.module";

// Primeng - Module
import { GMapModule } from 'primeng/gmap';

// services
import { MessageService } from 'primeng/api';

const primengModule = [GMapModule]
const allModules = [
  SignUpModule,
  HomePageModule,
  BarberHomePageModule,
  LoginModule,
  FooterModule,
  ReservationDetailsPageModule,
  DetailHaircutModule,
  MyProfileModule,
]

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details/:id', component: DetailHaircutComponent },
  { path: 'reservations/:id', component: ReservationDetailsPageComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'barber', component: BarberHomePageComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: '', redirectTo: 'objectif', pathMatch: 'full' },
      { path: 'objectif', component: ObjectifComponent },
      { path: 'profile', component: ProfilComponent },
      { path: 'address', component: AdresseComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [],
  providers: [FormBuilder, MessageService],
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ...allModules,
    ...primengModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
