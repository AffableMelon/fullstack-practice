// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { before } = require('node:test')

describe('Blog app', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http:localhost:3005/api/testing/reset')
    await request.post('http:localhost:3005/api/users', {
      data: {
        name: 'Testing Name',
        username:'TestUsername',
        password: 'TestPassword'
      }
    })
    
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log into app')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('TestUsername')
      await page.getByTestId('password').fill('TestPassword')
      await page.getByRole('button', { name: 'login' }).click()
    
      await expect(page.getByText('Logged in as TestUsername')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wrongcreds')
      await page.getByTestId('password').fill('wrongPass')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Notif: wrong creds')).toBeVisible()
    })

  })

  describe('when logged in', () => {
    beforeEach( async ({page, request}) => {
      await request.post('http:localhost:3005/api/testing/reset')
      await page.getByTestId('username').fill('TestUsername')
      await page.getByTestId('password').fill('TestPassword')
      await page.getByRole('button', {name: 'login'}).click()
    })

    test('new blog can be created', async({page}) => {
      await page.getByRole('button', {name: 'create new blog'}).click()

      await page.getByTestId('title').fill('donald')
      await page.getByTestId('auth').fill('hobbit')
      await page.getByTestId('url').fill('soomeurl.com')

      await page.getByRole('button', {name: 'submit'}).click()

      const newBlog = await page.waitForSelector('[data-testid="displayedblogs"] >> text= donald by hobbit');
      expect(newBlog).toBeDefined()

      const succsessNotif = await page.waitForSelector('text=Notif: Succsess')
      expect(succsessNotif).toBeDefined()
    })

    test('blog can be liked', async ({page}) => {
      

      const blog = page.getByText('React patterns by Michael Chan')
      await blog.getByRole('button', {name: 'expand'}).click()
      await blog.getByRole('button', {name: 'like'}).click()

      const updatedLikes = blog.getByText('text = /likes \d+/');
      expect(updatedLikes).toBeDefined();
    })

    test('blog can be deleted ', async ({page}) => {
      page.on('dialog', dialog => dialog.accept());
      const DelBlog = page.getByText('donald by hobbit')
      await DelBlog.getByRole('button', {name: 'expand'}).click()
      const delButton = DelBlog.getByRole('button', {name: 'delete'})
      //  await page.evaluate(() => {
      //   window.confirm = () => true;
      // });
      expect(delButton).toBeDefined()
      await delButton.click()
     
      const delblog = page.getByText('donald by hobbit')
      await expect(delblog).not.toBeVisible()
      
      
      

    })

    test ('blog creator can only delete', async ({ page }) => {
      const nonUserBlog = page.getByText('React patterns by Michael Chan')
      await nonUserBlog.getByRole('button', {name: 'expand'}).click()
      const noDel = nonUserBlog.getByRole('button', {name: 'delete'})
      await expect(noDel).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      const blogs = await page.$$('[data-testid="displayedblogs"]')
  
      let previousLikes = Infinity;
      // console.log(blogs)
  
      for (let blog of blogs) {
           // Convert ElementHandle to Locator
           const blogLoc = page.locator('[data-testid="displayedblogs"]').nth(blogs.indexOf(blog));
        
           // Find the element containing the likes text within the specific blog
           const likesElement = blogLoc.locator('text=likes');
   
           // Extract the text content of the likes element
           const likesText = await likesElement.textContent();
           
           // Parse the likes text (assuming it’s formatted as "Likes X")
           const currentLikes = parseInt(likesText.split(' ')[1]);
   
           // Assert that current likes are less than or equal to previous likes
           expect(currentLikes).toBeLessThanOrEqual(previousLikes);
   
           // Update previousLikes for the next iteration
           previousLikes = currentLikes;
      }
  });
  })
})





