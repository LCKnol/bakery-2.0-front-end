import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {DashboardDto} from "../dto/dashboardDto";
import {UserCollection} from "../dto/userCollection";
import {User} from "../dto/user";
import {EditdashboardComponent} from "../editdashboard/editdashboard.component";
import {AddDashboardComponent} from "../add-dashboard/add-dashboard.component";
import {AddUserComponent} from "../add-user/add-user.component";
import {AssignTeamComponent} from "../assign-team/assign-team.component";
import {RemoveUserFromTeamComponent} from "../remove-user-from-team/remove-user-from-team.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {Pi} from "../dto/pi";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTab,
    MatTabGroup,
    MatTable,
    MatToolbar,
    NgIf,
    MatMenuTrigger,
    MatHeaderCellDef,
    NgForOf,
    MatSlideToggle,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements AfterViewInit{
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  users?: User[] = []
  filteredUsers?: User[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private userService: UserService, private router: Router,public dialog: MatDialog) {
    this.showAllUsers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllUsers()
    });
  }

  deleteUser(id: number) {
      this.userService.deleteUser(id).then(res =>{
        this.showAllUsers()
      } )
  }

  private showAllUsers() {
    this.userService.getAllUsers().then(res =>{
      this.dataSource = new MatTableDataSource<User>(res.userCollection)
      this.displayedColumns = ['firstname', 'lastname','email','admin','teams','action',]
      this.dataSource.paginator = this.paginator;
      this.users = res.userCollection;
      this.filteredUsers  = res.userCollection
    })
  }

  filterResults(text: string) {
    if (!text) {
      this.dataSource = new MatTableDataSource<User>(this.users)
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.filteredUsers = this.users?.filter(
      user => user?.firstName.toLowerCase().includes(text.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<User>(this.filteredUsers)
    this.dataSource.paginator = this.paginator;
  }

  openAssignToTeamDialog(userid: number) {

    const dialogRef = this.dialog.open(AssignTeamComponent, {
      data: {
        userid:userid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllUsers()
    });

  }

  openRemoveFromTeamDialog(userid: number) {

    const dialogRef = this.dialog.open(RemoveUserFromTeamComponent, {
      data: {
        userid:userid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllUsers()
    });
  }

  updateAdminStatus(user: User) {
    user.isAdmin = !user.isAdmin
    this.userService.assignAdminRights(user).then(r => {
      this.showAllUsers()
    })
  }
}

