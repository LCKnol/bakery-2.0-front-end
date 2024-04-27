import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DashboardCardComponent} from "../dashboard-card/dashboard-card.component";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PiService} from "../services/pi.service";
import {MatPaginator} from "@angular/material/paginator";
import {PiCollection} from "../dto/pi-collection";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {LoginService} from "../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Pi} from "../dto/pi";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";

@Component({
  selector: 'app-pimanager',
  standalone: true,
  imports: [
    DashboardCardComponent,
    MatButton,
    MatCard,
    MatIcon,
    MatIconButton,
    MatInput,
    MatToolbar,
    NgForOf,
    RouterLink,
    MatTable,
    MatPaginator,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgIf,
    MatTabGroup,
    MatTab,
    MatTabLink,
    MatTabNav,
    NgOptimizedImage,
    MatTabNavPanel,
    MatFabButton
  ],
  templateUrl: './pimanager.component.html',
  styleUrl: './pimanager.component.css'
})
export class PimanagerComponent implements AfterViewInit {
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSwitch: boolean = true

  constructor(private piService: PiService) {
    this.showAllPis()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  showAllPis(){
    this.piService.getAllPis().then(res => {
      this.dataSource = new MatTableDataSource<Pi>(res.pis)
      this.displayedColumns = ['name', 'status', 'macadress','display','action']
      this.dataSource.paginator = this.paginator;
      this.dataSwitch = true
    });
  }

  showPiRequests(){
    this.piService.getPiRequests().then(res => {
      this.dataSource = new MatTableDataSource<any>(res.piRequests)
      this.displayedColumns = ['requestedon','macadress','action']
      this.dataSource.paginator = this.paginator;
      this.dataSwitch = false
    });
  }

  switchView(tab: MatTabChangeEvent) {
    if (tab.index == 0){
      this.showAllPis()
    }else if(tab.index == 1){
      this.showPiRequests()
    }
  }



}

