import sqlite3,datetime
#docker run -it --rm -v "$(pwd):/app" python  bash

base = 'test.db'

with sqlite3.connect(base) as conn:
    try:
        sentencia = """ create table usuario (
            user_id integer primary key autoincrement,
            docType text not null,
            nombre text not null,
            username text not null,
            fecha_creacion datetime default current_timestamp
        ) """
        conn.execute(sentencia)
        conn.commit()
        print("Tabla 'usuario' creada exitosamente.")
    except sqlite3.OperationalError as e:
        print(f"Error al crear la tabla: {e}")


with sqlite3.connect(base) as conn:
    try:
        sentencia = """ insert into usuario (docType, nombre, username) values
            ('usuario', 'Juan', 'jgarcia'),
            ('usuario', 'Maria', 'mlopez')"""
        conn.execute(sentencia)
        conn.commit()
        print("Usuarios insertados exitosamente.")
    except sqlite3.IntegrityError as e:
        print(f"Error al insertar usuarios: {e}")

with sqlite3.connect(base) as conn:
    try:
        sentencia = """ select * from usuario """
        cursor = conn.execute(sentencia)
        for row in cursor.fetchall():
            print(row)
    except sqlite3.OperationalError as e:
        print(f"Error al consultar usuarios: {e}")

 


with sqlite3.connect(base) as conn:
    try:
        id =1
        sentencia = """ UPDATE usuario SET nombre = 'Juan Garcia' WHERE user_id = ? """
        conn.execute(sentencia, (id,))
        conn.commit()
        print("Usuario actualizado exitosamente.")
    except sqlite3.OperationalError as e:
        print(f"Error al actualizar usuario: {e}")
        
with  sqlite3.connect(base) as conn:
    try:
        fecha = datetime.date(2025,4,3).strftime('%Y-%m-%d %H:%M:%S')
        sentencia = """ UPDATE usuario SET fecha_creacion = ? WHERE user_id = 1 """
        conn.execute(sentencia, (fecha,))
        conn.commit()
        print("Fecha de creación actualizada exitosamente.")
    except sqlite3.OperationalError as e:
        print(f"Error al actualizar fecha de creación: {e}")

with sqlite3.connect(base) as conn:
    try:
        id =1
        sentencia = """ select * from usuario where user_id = ? """
        cursor=conn.execute(sentencia,(id,))
        for row in cursor.fetchall():
            print(row)
    except sqlite3.OperationalError as e:
        print(f"Error al consultar usuarios: {e}")        


with sqlite3.connect(base) as conn:
    try:
        id =5
        sentencia = """ delete from usuario where user_id = ? """
        cursor=conn.execute(sentencia,(id,))
        conn.commit()
        print("Usuario eliminado exitosamente.")
    except sqlite3.OperationalError as e:
        print(f"Error al eliminar usuario: {e}")