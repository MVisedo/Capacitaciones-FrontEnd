import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeComponent } from '../../../../shared/components/mensaje/mensaje.component';
import { Product, queryProducts } from 'src/app/features/products/models/product.model';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/features/users/services/user.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ProductList: Product[]=[];
  userName:string = ""
  query:queryProducts = {page:1,limit:10}
  totalProducts:number = 0

constructor(private productService: ProductService, private userService: UserService,private dialog: MatDialog,private _snackBar: MatSnackBar){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      
      this.query.page = event.pageIndex+1
      this.query.limit = event.pageSize
      this.getProducts()
    })
  }
  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.GetAllProducts(this.query).subscribe({
      next:(productsData)=>{
        this.ProductList = productsData.results
        this.totalProducts = productsData.totalResults
      },
      complete:()=>{
        this.ProductList.forEach(product => {
          this.userService.GetUser(product.user).subscribe({
          next:(userData)=>{
            product.user = userData.email
          },
        });
        })
      }
    })
    
  }


  displayedColumns: string[] = ['name', 'descripcion', 'user', 'precio','buttons'];
  
  updatedProduct(id:string): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {data: {id:id},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getProducts()
    })
  }

  deleteProduct(id:string){
    
    const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Eliminar producto",mensaje:"¿Seguro que desea eliminar el producto?",aceptar:"Eliminar",cancelar:"Cancelar"},})
    dialogRef.afterClosed().subscribe(result=>{
      if(result==true){
        this.productService.DeleteProduct(id).subscribe(()=>{
        this.getProducts()
        this._snackBar.open("Producto eliminado","Aceptar",{duration:3000})
        })

      }
      
    })
    
  }

  createProduct(){
    const dialogRef = this.dialog.open(ProductFormComponent, {data: {id:''},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getProducts()
    })
  }

  
  

  

  

}

