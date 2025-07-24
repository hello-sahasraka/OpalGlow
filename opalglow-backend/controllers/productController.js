import Product from "../models/product.js";


export function createProduct(req, res){
    if(req.user == null){
        res.status(403).json(
            {
                "mesage": "You need to login first!"
            }
        )

        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json(
            {
                "message": "You are not authorized to create a product!"
            }
        )

        return;
    }

    const product = new Product(req.body);

    product.save().then(
        ()=> {
            res.json(
                {
                    "message": "Product created successfully!"
                }
            )
        }
    ).catch(
        (err)=> {
            console.log(err);

            res.status(500).json(
                {
                    "message": "Product creation failed!"
                }
            )
        }
    )
}

export function getProduct(req, res){
    Product.find().then(
        (products)=> {
            res.json(products);
        }
    ).catch(
        ()=> {
            res.status(500).json(
                {
                    "message": "Failed to get products!"
                }
            )
        }
    );
}

export function deleteProduct(req, res){

    if(req.user.role != "admin"){
        res.status(403).json(
            {
                "message": "You are not authorized to delete a product!"
            }
        )

        return;
    }

    Product.findOneAndDelete(
        {
            productId: req.params.productId
        }
    ).then(
        ()=> {
            res.json(
                {
                    "message": "Product deleted successfully!"
                }
            )
        }
    ).catch(
        ()=> {
            res.status(500).json(
                {
                    "message": "Failed to delete product!"
                }
            )
        }
    )
}

export function updateProduct(req, res){
    if(req.user.role != "admin"){
        res.status(403).json(
            {
                "message": "You are not authorized to delete a product!"
            }
        )

        return;
    }

    Product.findOneAndUpdate(
        {
            productId: req.params.productId
        }, req.body
    ).then(
        ()=> {
            res.json(
                {
                    "message": "Product updated successfully!"
                }
            )
        }
    ).catch(
        ()=> {
            res.status(500).json(
                {
                    "message": "Failed to update product!"
                }
            )
        }
    )
}