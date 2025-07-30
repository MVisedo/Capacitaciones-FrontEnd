import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductStock, queryProducts } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { UserService } from 'src/app/features/users/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { MensajeComponent } from 'src/app/shared/components/mensaje/mensaje.component';
import { StockService } from '../../services/stock.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {
    productList: Product[]=[];
    productStockList: ProductStock[]=[];
    userName:string = ""
    query:queryProducts = {page:1,limit:10}
    totalProducts:number = 0

    editIndex: number | null = null;
    editableStock: number = 0;
  
  constructor(private productService: ProductService, private stockService: StockService,private dialog: MatDialog,private _snackBar: MatSnackBar){}
  
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

  
getProducts() {
  this.productService.GetProducts(this.query).subscribe({
    next: (productsData) => {
      this.productList = productsData.results;
      this.totalProducts = productsData.totalResults;

      const stockRequests = this.productList.map(product =>
        this.stockService.GetStock(product.id).pipe(
          map(stockData => ({ product, stock: stockData.cantidad }))
        )
      );

      forkJoin(stockRequests).subscribe({
        next: (combinedResults) => {
          this.productStockList = combinedResults;
        }
      });
    }
  });
}



  displayedColumns: string[] = ['name', 'stock','actions'];
  
  startEdit(index: number, element: ProductStock) {
    this.editIndex = index;
    this.editableStock = element.stock;
  }

  cancelEdit() {
    this.editIndex = null;
    this.editableStock = 0;
  }

  saveEdit(element: ProductStock) {
    const newStock = this.editableStock;

    this.stockService.UpdateStock(element.product.id, {cantidad:newStock}).subscribe({
      next: () => {
        element.stock = newStock;
        this._snackBar.open('Stock actualizado', 'Cerrar', { duration: 2000 });
        this.cancelEdit();
      },
      error: () => {
        this._snackBar.open('Error al actualizar stock', 'Cerrar', { duration: 2000 });
      }
    });
  }
}

