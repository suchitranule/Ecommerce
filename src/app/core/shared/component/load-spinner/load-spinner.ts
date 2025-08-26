import { Component } from '@angular/core';
import { LoadSpinnerService } from '../../service/load-spinner';

@Component({
  selector: 'app-load-spinner',
  standalone: false,
  templateUrl: './load-spinner.html',
  styleUrls: ['./load-spinner.scss']
})
export class LoadSpinner {

  constructor(public loadSpinnerService:LoadSpinnerService) {}

}
