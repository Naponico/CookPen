import sqlite3,os
from flask import Flask, render_template, request, url_for, flash, redirect,jsonify
from werkzeug.utils import secure_filename
import sys

app=Flask(__name__)
app.config['SECRET_KEY']='22052002';
app.config['UPLOAD_FOLDER']="static"

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


def get_db_delete():
    conn = sqlite3.connect('database.db')
    return conn

@app.route('/',methods=('GET', 'POST')) 
def index():
    conn = get_db_connection()
    recettes = conn.execute('SELECT * FROM recette').fetchall()
    conn.close()
    return render_template('index.html',recettes=recettes)

@app.route("/deleterecipe/<int:id>",methods=('GET', 'POST'))
def parse_data(id):
    conn=get_db_delete()
    sql = 'DELETE FROM recette WHERE id='+str(id)
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    conn.close()
    return index()


@app.route("/createrecette/",methods=['POST'])
def createNewRecette():
    gettitle=request.form['name']
    getallerg=request.form['allerg']
    getcontent=request.form['desc']
    conn=get_db_delete()
    sql="INSERT INTO recette(title,content,filepath,allergene) VALUES (:titre,:contenu,:filepath,:allerge)"
    f = request.files['file']
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
    conn.execute(sql,{"titre" : gettitle,"contenu":getcontent,"filepath":f.filename,"allerge":getallerg})
    conn.commit()
    conn.close()
    return index()
