import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material.imports';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MATERIAL_IMPORTS, CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  items$: Observable<any[]>;
  loading = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
    console.log('Firestore verbunden:', firestore);
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    try {
      const usersRef = collection(this.firestore, 'users');   // 🔥 Referenz
      await addDoc(usersRef, this.user.toJSON());             // 🔥 addDoc statt .add()
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }

    console.log('User gespeichert:', this.user);
  }
}
