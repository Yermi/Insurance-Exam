import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { usersResolver } from './resolvers/users.resolver';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { userResolver } from './resolvers/user.resolver';

const routes: Routes = [
  {
    path: "",
    component: UserListComponent,
    resolve: {
      users: usersResolver
    }
  },
  {
    path: "new",
    component: UserDetailsComponent
  },
  {
    path: ":id",
    component: UserDetailsComponent,
    resolve: {
      user: userResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
