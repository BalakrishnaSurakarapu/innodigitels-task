import { Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page4Component } from './page4/page4.component';
import { Page3Component } from './page3/page3.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

export const routes: Routes = [
    { path: '', redirectTo: 'page1', pathMatch: 'full' },
    {path: 'page1', component:Page1Component},
    {path: 'page2', component:Page2Component},
    {path: 'page3', component:Page3Component},
    {path: 'page4', component:Page4Component},
    {path: 'parent', component:ParentComponent},
    {path: 'child', component:ChildComponent}
];
