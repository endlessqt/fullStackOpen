describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/");
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "test",
      password: "test",
      username: "test",
    });
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "rofl",
      password: "rofl",
      username: "rofl",
    });
    cy.visit("http://localhost:3000");
  });
  it("shows log in form by default", function () {
    cy.contains("Log In");
    cy.get("#logInForm").contains("username");
    cy.get("#logInForm").contains("password");
    cy.get("#logInForm").contains("log in");
  });
  describe("Login", function () {
    it("success with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("button").click();
      cy.contains("test logged in");
    });
    it("throws an error with wrong username or password", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("asd;lasldjk");
      cy.get("button").click();
      cy.get("#notification").contains("invalid username or password");
      cy.get("#notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
    });
    it("user can create blog", function () {
      cy.contains("create blog").click();
      cy.get("#blogForm").contains("Create new blog");
      cy.get("#title").type("NewCreatedBlog");
      cy.get("#author").type("NewAuthor");
      cy.get("#url").type("newblog.com");
      cy.get("#buttonSubmit").click();
      cy.get("#notification").contains("NewCreatedBlog").wait(5000);
      cy.get("html").should("contain", "NewCreatedBlog by NewAuthor");
    });
    it("user can like a blog", function () {
      cy.contains("create blog").click();
      cy.get("#blogForm").contains("Create new blog");
      cy.get("#title").type("NewCreatedBlog");
      cy.get("#author").type("NewAuthor");
      cy.get("#url").type("newblog.com");
      cy.get("#buttonSubmit").click();
      cy.get("#view").click();
      cy.get("#info").contains("0");
      cy.get("#info").contains("like").click();
      cy.get("#info").contains("1");
      cy.get("#info").contains("like").click().wait(1000);
      cy.get("#info").contains("2");
    });
    it("user can delete a blog", function () {
      cy.contains("create blog").click();
      cy.get("#blogForm").contains("Create new blog");
      cy.get("#title").type("NewCreatedBlog");
      cy.get("#author").type("NewAuthor");
      cy.get("#url").type("newblog.com");
      cy.get("#buttonSubmit").click();
      cy.get("#view").click();
      cy.get("#info").contains("remove").click();
      cy.wait(5000);
      cy.get("html").should("not.contain", "NewCreatedBlog");
    });
    it("user cannot delete blog in case its created not by him", function () {
      cy.contains("create blog").click();
      cy.get("#blogForm").contains("Create new blog");
      cy.get("#title").type("NewCreatedBlog");
      cy.get("#author").type("NewAuthor");
      cy.get("#url").type("newblog.com");
      cy.get("#buttonSubmit").click();
      cy.contains("logout").click();
      cy.login({ username: "rofl", password: "rofl" });
      cy.get("#view").click();
      cy.get("#view").should("not.contain", "remove");
    });
    describe("several blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({ author: "first", title: "first", url: "first" });
        cy.createBlog({ author: "second", title: "second", url: "second" });
        cy.createBlog({ author: "third", title: "third", url: "third" });
      });
      it.only("blogs are ordered by number of likes", function () {
        cy.get("#first").get("#view").click();
        cy.get("#first").get("#info").contains("like").as("first");
        cy.get("@first").click().wait(5).click().wait(5);
        cy.get("#second").contains("view").click();
        cy.get("#second").contains("like").as("second");
        cy.get("@second").click().wait(5).click().wait(5).click();
        cy.get("#third").contains("view").click();
        cy.get("#third").contains("like").as("third");
        cy.get("@third")
          .click()
          .wait(5)
          .click()
          .wait(5)
          .click()
          .wait(5)
          .click();
        cy.get("#blogWrapper")
          .children()
          .first()
          .then((el) => {
            const third = el[0].nextSibling;
            cy.wrap(third).should("contain", "4");
            cy.wrap(third.nextSibling).should("contain", "2");
          });
      });
    });
  });
});
