import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  showToaster(message: string, displayCloseAction: boolean = true) {
    this.snackBar.open(message, displayCloseAction ? 'Close' : undefined, { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 4000 });
  }
}
