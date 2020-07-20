import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public snackBar: MatSnackBar) { }

  openMessageBar(errorMessage: string, durationTime: number): void {
    this.snackBar.open(errorMessage, 'OK', {
      panelClass : 'snackbarStyle',
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'left',
      duration: durationTime == null ? null : durationTime
    });
  }

}
