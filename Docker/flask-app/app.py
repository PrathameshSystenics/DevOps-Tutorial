from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SECRET_KEY"] = "dev-secret-key"

db = SQLAlchemy(app)


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)


@app.route("/")
def index():
    users = db.session.execute(db.select(User).order_by(User.id)).scalars().all()
    return render_template("index.html", users=users)


@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        user = User(
            name=request.form["name"].strip(),
            email=request.form["email"].strip(),
        )
        db.session.add(user)
        db.session.commit()
        flash("User created.", "success")
        return redirect(url_for("index"))
    return render_template("form.html", user=None, action="Create")


@app.route("/edit/<int:user_id>", methods=["GET", "POST"])
def edit(user_id):
    user = db.get_or_404(User, user_id)
    if request.method == "POST":
        user.name = request.form["name"].strip()
        user.email = request.form["email"].strip()
        db.session.commit()
        flash("User updated.", "success")
        return redirect(url_for("index"))
    return render_template("form.html", user=user, action="Edit")


@app.route("/delete/<int:user_id>", methods=["POST"])
def delete(user_id):
    user = db.get_or_404(User, user_id)
    db.session.delete(user)
    db.session.commit()
    flash("User deleted.", "success")
    return redirect(url_for("index"))


def seed():
    """Create the database and add a few users if it's empty."""
    with app.app_context():
        db.create_all()
        if db.session.execute(db.select(User)).first() is None:
            db.session.add_all(
                [
                    User(name="Alice", email="alice@example.com"),
                    User(name="Bob", email="bob@example.com"),
                    User(name="Charlie", email="charlie@example.com"),
                ]
            )
            db.session.commit()


if __name__ == "__main__":
    seed()
    app.run(port=5000, debug=True)
