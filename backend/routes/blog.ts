import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ganesh-revadi/medium-commons";


// Create the main Hono app
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();


blogRouter.use('/*', async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const payload = await verify(jwt, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set('userId', payload.id);
  await next()
})

blogRouter.post('/', async (c) => {

  const userId = c.get('userId')

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
      message: "Incorrect Inputs"
    })
  }
  try {
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        title: body.title,
        content: body.content
      },
    });
    return c.json({
      id: post.id
    });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }

});


blogRouter.put('/', async (c) => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success } = updateBlogInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
      message: "Incorrect Inputs"
    })
  }
  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content
    }
  })

  return c.json({
    id: blog.id
  })

})
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({ blogs })

})

blogRouter.get("/id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  // @ts-ignore
  const id = c.req.param('id')

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      },
    })
    return c.json({
      blog
    })
  }
  catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post"
    })
  }

})
