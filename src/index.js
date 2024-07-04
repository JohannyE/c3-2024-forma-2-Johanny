import koa from 'koa';
import bodyParser from 'koa-body';
import router from './routes/index';

const app = new koa();
const port = 3000;

app.use(bodyParser({ multipart: true, urlencoded: true }));
app.use(router.routes());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500; // Establece el código de estado
        ctx.body = { message: err.message }; // Responde con el mensaje de error
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export { server, app };
