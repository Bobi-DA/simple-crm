import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material.imports';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MATERIAL_IMPORTS, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  users$!: Observable<any[]>;
  allUsers:any = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {
  }

  ngOnInit() {
    const usersCollection = collection(this.firestore, 'users');
    const users$ = collectionData(usersCollection, { idField: 'id' });

    console.log('Users$: ', users$);

    // Methode: subscribe()
    users$.subscribe((users) => {
      console.log('Alle Users aus Firestore: ', users);
      this.allUsers = users;
      // Hier kannst du mit den Daten arbeiten
      // Beispiel: users.forEach(u => console.log(u.name));
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
