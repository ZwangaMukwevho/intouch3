function validateToken(token, admin) {
  admin
    .auth()
    .verifyIdToken(
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWU0ZDkxOGE0ODY0YWQxMzUxMDViYmRjMDEwYWY5Njc5YzM0MTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtZ2V0dGluZy1zdGFydGVkLTc4Zjg1IiwiYXVkIjoicmVhY3QtZ2V0dGluZy1zdGFydGVkLTc4Zjg1IiwiYXV0aF90aW1lIjoxNjczNzExNjA0LCJ1c2VyX2lkIjoiQWVzYXFOc3J1elhiczdLTGxoQWVZOHhGcUJKMyIsInN1YiI6IkFlc2FxTnNydXpYYnM3S0xsaEFlWTh4RnFCSjMiLCJpYXQiOjE2NzM3MTE2MDQsImV4cCI6MTY3MzcxNTIwNCwiZW1haWwiOiJ6d2FuZ2F0bUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ6d2FuZ2F0bUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.uyHmh8P0c4eoXAL8_t1N15ZLn6H9CwThqeWgZJEDgohfaVkkFbf9VDYxCnZiirbWGFsl_2y-8iiTF1PvL-_uPsCG74I-qvey2_p0DkUOdBKrEGX_uk9yIJJ9cGUsJHVPW7hT36O67O0eP-fK1oOjg-uM8jnnWzi3GeaZHy_D923EwQ7xRsvyIvLc97Vo_XxFwZvvXy5oND2fksa7vce_-FAZNbOOslpAdQ-7PJudqJ3HrFfJ-_K4XMx_Qys_0BddTHlPvTEeXYRrQIixMG7-MP9YpdT6f-CS7_gNcRUp46c-6HfG8DnCJshzkOV8C9Vezs41BpWN_lTwrKzNdCWAFw"
    )
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(decodedToken);
      return NextResponse.redirect("http://localhost:3000/home");
    })
    .catch((error) => {
      console.log(error.message);
      return NextResponse.redirect("http://localhost:3000/signin");
    });
}
