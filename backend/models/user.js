import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACUCAMAAAAu5KLjAAAAMFBMVEXk5ueutLeorrHn6eqrsbTh4+Tb3t+yuLvFycu2u76+w8W6v8Lq7O3Y29zKztDQ09X+iHusAAADy0lEQVR4nO2b25arIAxAkYjc5f//9oB2Ou1MHbloomexH/rQp72CCbfAWKfT6XQ6nU6n0+l0Op3/EnCOiSkhwAG1zQbAgtJyWJBSK88uZwpsmjXn4/DNyEcbJriQKjhv5Kvil+kozXQdT6/HD5IPUyMuIQpC8S3JVXS+gKgLn4b7XVR7R62p9iQX0ZlWUpgcy+hpKC1hd8Cfnoru+xQyU5I0nsLmxnL1pImnK7JMeUThCYoXWUbPgO8JvlAyIdA1WUH6PMOpscu8yyyYPzyRP0+YaizjOnRC1WRVwcSeNavyZ/VEzaLKYKZJEzGLRGnJfAHPErJWbxvhxKvxUFEzn5p4S5BQH0zEmtQy5mnUkTTLFnC/NLEWyFPDpxmROJrgW4I5DBzFsjGDoqbH0ayeglaQlknQlEERgzJfthT3BYszrbdqapxUbxxzrIrUNY+k0RJJsznTcVLoJgUJbKMmTnnPOyDeButM4SZLj5ss5O6xLL7LJqNty8axtmxtuwy8Q7mbHCe4exzOMFGvKdEkWdPBIeKx9l2OYeEWh9pxJqrT1Mg3Q3UlnuCeTVdYIu3QX6nIIklwGQhz8T0BwdVq+X0gzUV18bU/XRtFgSdhUwrknyFyRWbJUoNPXh5xwsaZBMw5Ay5JcvwV5/Vu85m9QNvhbisfn6/Rb+qEGTYbI6W5hmQCvJIfWjjHUaoLjPc3wETQ4/vg89H6C3Ru/gAc+NlaLRPamnkC8q7NDSBGdfLeT4JdtqE8WYL7Aq7Uo80WtyWEs1JxxGPaJAYprVFzSHFl9MLRIPoZLR92b2m+/KONmVP7O51qVFyeDWx2kz904480gaR8gvDBjn9OP+9wLudYnzBdwU3K7gTxY1y1ClhVKsYjVOwqH6bDgDIvQZwXh4aeruX5Qzh5cgLn7eYqoyCkOpz4kQLbX1tmm562ugNvCjJ7V1SeUqIAtheVlaLHvygBFg6WTPCD3xLBZJuye4tj93IZb4KqsUd5gjgnlCvjcEy5h8Oq0BZHHIG56tuAbA44BIPGy/M8T9tYQlvu0/A8YUaxTJ4NFbTtRrrMs/4qxmHFcvGsLaAo2fPiWfnW7fxK9MOzri6dXdV/e/pyz7rnVY0UpxHyh7lSftvR2GtU61naVUMx5IkiSZhOXLr9RdnjrNJ3swdSsPokyZ+Voiyi+jIT+U1f2PPPKwVNK3gLo09kf5yUkgPPnTI9UTVaye1bcYbSMrtxpbmvvZW8UZ+ILfNaVyBQa2ZVeLTd5CY26+OkrZpDZvdxW7v4IWRpSk4N0muITqdzMf4B56czAiwYanUAAAAASUVORK5CYII="
    }
},{timestamps:true});
export const User=mongoose.model("User",userSchema);