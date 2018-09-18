var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors')

var bodyParser = require('body-parser')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sakuragi',
    database: 'kikipipi_user'
})

var session = require('express-session');
var sess = {
    secret: 'workhard',
    cookie: {}
}
app.use(session(sess))

// var morgan = require('morgan');
// app.use(morgan('combined'))


db.connect()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extender : false}));

//------------------------------------------------------------- LOGIN ADMIN -------------------------------------------------------------//

app.post('/loginAdmin', function(req,res){
    db.query("select * from admins where ? and ?",
  [
      {
          name: req.body.username,
      },
      {
          password: req.body.password,
      }
  ],
  
      (err, result)=>{
      if(err) throw err;

      if (result.length > 0){
          username = req.body.username
          loginstatus = true;
          // IDuser = result[0].idf
          // nameUser = result[0].nama
          // telpon = result[0].telp
      }
      else{
          loginstatus = false;
      }
      res.send({result, loginstatus})
      console.log(result)
  })
})

//------------------------------------------------------------- EDIT PRODUCT DETAILS ADMIN -------------------------------------------------------------//

app.post('/adminProduct/:id',(req,res)=>{
    db.query("update product set ? where ?",
    [
        {
            nama_product: req.body.namaprod,
            description: req.body.description,
            stock: req.body.stock,
            harga: req.body.harga,
            img_src: req.body.img_src
        },
        {
            id_product: req.params.id
        },
    ],
        (err,result)=>{
            if(err) throw err
            let edited = true
            res.send(edited)
            console.log(edited)
        })
})
//------------------------------------------------------------- EDIT CATEGORY DETAILS ADMIN -------------------------------------------------------------//
app.post('/adminCategory/:id',(req,res)=>{
    console.log(req.body.types)
    console.log(req.params.id)

    db.query("update categories set ? where ?",
    [
        {
            types: req.body.types
        },
        {
            id: req.params.id
        },
    ],
        (err,result)=>{
            if(err) throw err
            let edited = true
            res.send(edited)
            console.log(edited)
        })
})


//------------------------------------------------------------- ADD PRODUCT FOR ADMIN -------------------------------------------------------------//


app.post('/addProduct',(req,res)=>{
    db.query("insert product set ?",
    [
        {
            id_product: null,
            nama_product: req.body.namaprod,
            description: req.body.description,
            stock: req.body.stock,
            harga: req.body.harga,
            img_src: req.body.img_src
        }
    ],
        (err,result)=>{
            if(err) throw err
            let added = true
            res.send(added)
            console.log(added)
        })
})

//------------------------------------------------------------- ADD CATEGORY FOR ADMIN -------------------------------------------------------------//

app.post('/addType',(req,res)=>{
    db.query("insert categories set ?",
    [
        {
            id: null,
            types: req.body.types
        }
    ],
        (err,result)=>{
            if(err) throw err
            let added = true
            res.send(added)
            console.log(added)
        })
})

//------------------------------------------------------------- DELETE PRODUCT FOR ADMIN -------------------------------------------------------------//

app.post('/delete-product/:id',(req,res)=>{
    db.query("delete from product where ?",
    {
        id_product: req.params.id
    })
    res.send(true)
})

//------------------------------------------------------------- DELETE CATEGORY FOR ADMIN -------------------------------------------------------------//

app.post('/delete-type/:id',(req,res)=>{
    db.query("delete from categories where ?",
    {
        id: req.params.id
    })
    res.send(true)
})

//------------------------------------------------------------- FILTER INVOICE FOR ADMIN -------------------------------------------------------------//

app.post('/invoice/dates',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where year(time)= ${req.body.year} and month(time)=${req.body.month} and day(time)=${req.body.day}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})

app.post('/invoice/dates/day',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where day(time)=${req.body.day}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})

app.post('/invoice/dates/month',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where month(time)=${req.body.month}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})

app.post('/invoice/dates/year',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where year(time)=${req.body.year}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})

app.post('/invoice/dates/daymonth',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where month(time)=${req.body.month} and day(time)=${req.body.day}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})

app.post('/invoice/dates/dayyear',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where year(time)=${req.body.year} and day(time)=${req.body.day}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})

app.post('/invoice/dates/monthyear',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where year(time)=${req.body.year} and month(time)=${req.body.month}`,
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log(result)
    })
})


app.post('/invoice/searchby',(req,res)=>{
    db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where ${req.body.by} like '%${req.body.search}%'`,
    (err,result)=>{
        if (err) throw err;

        console.log(result)
        res.json(result)
    })
})

// app.post('/invoice/by',(req,res)=>{
//     db.query(`select id_inv, product_name, quantity, total_price, time , no_telp , nama_pembeli from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where ${req.body.by} like '%${req.body.search}%'`,
//     (err,result)=>{
//         if (err) throw err;

//         console.log(result)
//         res.json(result)
//     })
// })

app.get('/forRadioInv',(req,res)=>{
    db.query(`select * from forRadio`,
    (err,result)=>{
        if(err) throw err;

        res.json(result)
    })
})

//------------------------------------------------------------- LOGIN USER -------------------------------------------------------------//

app.post('/loginpage', function(req,res){
      db.query("select * from datauser where ? and ?",
    [
        {
            username: req.body.username,
        },
        {
            password: req.body.password,
        }
    ],
        (err, result)=>{
        if(err) throw err;

        let loginstatus
        let username
        let IDuser
        let namaUser
        let telpon

        if (result.length > 0){
            username = req.body.username
            loginstatus = true;
            // IDuser = result[0].id
            // nameUser = result[0].nama
            // telpon = result[0].telp
        }
        else{
            loginstatus = false;
            username = null
            IDuser = null
            nameUser = null
            telpon = null
        }
        res.send({result, loginstatus})
        console.log(IDuser,namaUser,telpon,result)
    })
})

//------------------------------------------------------------- REGISTER USER -------------------------------------------------------------//


app.post('/register', function(req,res){
    db.query("select username from datauser where ?",
    {
        username: req.body.username,
    },
    (err,result)=>{
        if (err) throw err;

        let statusregister

        if(result.length === 1){

            statusregister = false
        }
        else{
            db.query("insert datauser set ?",
            {
                id_user: null,
                nama_panjang: req.body.name,
                username: req.body.username,
                password: req.body.password,
                telp: req.body.telp
            }
        )
            statusregister = true
        }

        res.send({statusregister})
        console.log(statusregister,result)
  })
})


//------------------------------------------------------------- PRODUCT -------------------------------------------------------------//

app.get('/product',(req,res)=>{
    db.query("select * from product",

    (err,result)=>{
        if (err) throw err;
        
        res.json(result)
        console.log(result)
    })
})

//------------------------------------------------------------- CATEGORY -------------------------------------------------------------//

app.get('/category',(req,res)=>{
    db.query("select * from categories",

    (err,result)=>{
        if (err) throw err;
        
        res.json(result)
        console.log(result)
    })
})

//------------------------------------------------------------- FILTER BY CATEGORY -------------------------------------------------------------//

app.post('/categories/:type',(req,res)=>{ 
    console.log(req.params.type)
        db.query(`select id_product, nama_product, description,stock,harga,img_src,types from product p join categories c on p.category = c.id where c.id = ${req.params.type} `,
    // {
    //     category: req.params.type,
    // },
    (err,result)=>{
        if(err) throw err

        res.json(result)
        console.log(result)
    })
})


//------------------------------------------------------------- ADD PRODUCT TO CART -------------------------------------------------------------//

app.post('/cart',(req,res)=>{
    db.query("insert cart set ?",
    [{
        id_cart: null,
        nama2_product: req.body.nama_product,
        quantity: req.body.quantity,
        total_harga: req.body.total_harga,
        user_id: req.body.user_id,
        status: req.body.status,
        product_id: req.body.product_id
    }],
    (err,result)=>{
        if (err) throw err;

        res.json({result})
        console.log(result)
    })
})

//------------------------------------------------------------- DISPLAY ITEM TO CART -------------------------------------------------------------//

app.get('/cart/:id',(req,res)=>{
    db.query("select * from cart where ? and ?",
[
    {
        user_id: req.params.id,
    },
    {
        status: '@cart'
    }
],
    (err,result)=>{
        if (err) throw err;

        res.send(result)
        console.log({result})
    })
})

//------------------------------------------------------------- DISPLAY ITEM TO CART -------------------------------------------------------------//

app.post('/cart/update',(req,res)=>{
    db.query("update cart set ? where ?",
[
    {
        quantity: req.body.quantity
    },
    {
        product_id: req.body.id_cart
    }
])
})

//------------------------------------------------------------- DELETE ITEMS FROM CART -------------------------------------------------------------//

app.post('/cart/cancel',(req,res)=>{
        db.query("update cart set ? where ? and ? and ?",
    [
        {
            status: 'canceled'
        },
        {
            user_id: req.body.id_user,
        },
        {
            status: '@cart'
        },
        {
            id_cart: req.body.id_cart
        }
    ])
    res.send(true)
})

//------------------------------------------------------------- CHECKOUT & INVOICE -------------------------------------------------------------//

app.post('/checkout',(req,res)=>{
    var kode_inv = "INV" + (new Date).getDate() + (new Date).getMonth() + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds() + '-' +req.body.id_user
    db.query("select * from cart where ? and ?",
[
    {
        user_id: req.body.id_user
    },
    {
        status: '@cart'
    }
],
        (err,result)=>{
            if(err) throw err;
            db.query("SELECT * from datauser where ?",
            {
                id_user: req.body.id_user
            },
            (err,result2)=>{
                console.log(result2)
                // var kode_inv = "INV" + (new Date).getDate() + (new Date).getMonth()  + (new Date).getSeconds()
                db.query("insert invoicedata set ?",
                {
                    id_inv: kode_inv,
                    ids_user: req.body.id_user,
                    no_telp: result2[0].telp,
                    nama_pembeli: result2[0].nama_panjang,
                },
                (err, result3)=>{
                    console.log(result3)

                    result.forEach(x => {
                        // for(i=0;i<{result}.length;i++){
                        db.query("insert invoicesdetail set ?",
                        {
                            inv_id: kode_inv,
                            product_name: x.nama2_product,
                            quantity: x.quantity,
                            total_price: x.total_harga,
                            time: (new Date)
                        },
                        (err, result4)=>{
                            console.log(result4)

                            db.query("update cart set ? where ? and ?",
                        [
                            {
                                status: '@checkout',
                            },
                            {
                                user_id: req.body.id_user,
                            },
                            {
                                status: '@cart'
                            }
                        ],
                                (err, result5)=>{
                                    if(err) throw err
                                    console.log(result5)

                                    db.query("select stock from product where ?",
                                {
                                    nama_product: x.nama2_product
                                },
                                    (err,result6)=>{
                                        console.log(result6)

                                        db.query("update product set ? where ?",
                                    [
                                        {
                                            stock: result6[0].stock - x.quantity,
                                        },
                                        {
                                            nama_product: x.nama2_product
                                        }
                                    ]
                                )
                                })
                            })
                        })
                    });
                })
            })
        })
        res.send(kode_inv)
        console.log(kode_inv)
})

//------------------------------------------------------------- INVOICE -------------------------------------------------------------//

app.get('/invoice-data/:inv',(req,res)=>{
    db.query("select * from invoicedata where ?",
    {
        id_inv: req.params.inv
    },
    (err,result)=>{
        if (err) throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/invoice-detail/:inv',(req,res)=>{
    db.query("select * from invoicesdetail where ?",
    {
        inv_id: req.params.inv
    },
    (err,result)=>{
        if (err) throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/invoice-tgl/:inv',(req,res)=>{
    db.query("select time from invoicesdetail where ? limit 1",
    {
        inv_id: req.params.inv
    },
    (err,result)=>{
        if (err) throw err;
        res.send(result)
        console.log(result)
    })
})

app.get('/invoicehistory/:ids',(req,res)=>{
    db.query("select inv_id,product_name,total_price,time from invoicesdetail dtl join invoicedata dt on dtl.inv_id = dt.id_inv where ?",
    {
        ids_user: req.params.ids
    },
    (err,result)=>{
        if (err) throw err;
        res.send(result)
        // console.log(result)
    })
})


//------------------------------------------------------------- SERVER -------------------------------------------------------------//

app.listen(3210,()=>{
    console.log('Connect to @3210')
})
