import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import { beforeEach, describe, expect } from "vitest";
import MakeBlog from "./MakeBlog";

describe("Blog component tests", () => {
  test("renders content", () => {
    const blog = {
      title: "Tests render",
      author: "Author tested",
      likes: 0,
      url: "someurl.com",
      user: {
        username: "tested1234",
      },
      id: "123acb",
    };

    render(<Blog blog={blog} />);

    const url = screen.queryByText("someurl.com");
    const like = screen.queryByText("Current Likes: 0");
    const TA = screen.getByText("Tests render by Author tested");
    screen.debug();

    expect(like).toBeNull();
    expect(url).toBeNull();
    expect(TA).toBeDefined();
  });

  test("shows URL and likes when the button is clicked", () => {
    const blog = {
      title: "Tests render",
      author: "Author tested",
      likes: 0,
      url: "someurl.com",
      user: {
        username: "tested1234",
      },
      id: "123acb",
    };

    render(<Blog blog={blog} />);

    const button = screen.getByText("expand");
    fireEvent.click(button);

    const url = screen.getByText("someurl.com");
    const likes = screen.getByText("Current Likes: 0");

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("like button is clicked twice, the event handler is called twice", () => {
    const blog = {
      title: "Tests render",
      author: "Author tested",
      likes: 0,
      url: "someurl.com",
      user: {
        username: "tested1234",
      },
      id: "123acb",
    };
    const mockHandler = vi.fn();

    render(<Blog blog={blog} handleLike={mockHandler} />);

    const button = screen.getByText("expand");
    fireEvent.click(button);

    const likeButton = screen.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  test("form calls the event handler with the right details when a new blog is created", () => {
    const createBlog = vi.fn();

    render(<MakeBlog sendBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText("Title");
    const authorInput = screen.getByPlaceholderText("Author");
    const urlInput = screen.getByPlaceholderText("URL");
    const createButton = screen.getByText("submit");

    fireEvent.change(titleInput, { target: { value: "Test Blog" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(urlInput, { target: { value: "http://testurl.com" } });

    fireEvent.click(createButton);

    expect(createBlog).toHaveBeenCalledWith({
      title: "Test Blog",
      author: "Test Author",
      url: "http://testurl.com",
    });
  });
});

// import { render, screen, fireEvent } from '@testing-library/react';
// import BlogForm from './BlogForm';

//
