from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

CORS(app)

orders_database = []
token_counter = 101


@app.route('/')
def home():
    return jsonify({
        "message": "PES CampusBites Flask Backend Running"
    })


@app.route('/api/order', methods=['POST'])
def create_order():

    global token_counter

    try:

        data = request.get_json()

        new_order = {
            "id": token_counter,
            "studentName": data.get('studentName'),
            "studentUsn": data.get('studentUsn'),
            "basket": data.get('basket', []),
            "totalCost": data.get('totalCost'),
            "timestamp": datetime.now().isoformat()
        }

        token_counter += 1

        orders_database.append(new_order)

        return jsonify({
            "message": f"Success! Token ID #{new_order['id']} created.",
            "order": new_order
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400


@app.route('/api/orders', methods=['GET'])
def get_orders():

    return jsonify(orders_database)


@app.route('/api/order/complete', methods=['POST'])
def complete_order():

    global orders_database

    try:

        data = request.get_json()

        order_id = data.get('id')

        updated_orders = []

        removed_order = None

        for order in orders_database:

            if order['id'] == order_id:
                removed_order = order
            else:
                updated_orders.append(order)

        orders_database = updated_orders

        if removed_order:

            return jsonify({
                "message": f"Order #{order_id} completed successfully"
            })

        return jsonify({
            "error": "Order not found"
        }), 404

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400


@app.route('/api/health')
def health():

    return jsonify({
        "status": "healthy"
    })


if __name__ == '__main__':

    app.run(
        debug=True,
        port=5000
    )