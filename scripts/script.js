//Constructor class for a vehicle order
function VehicleOrder(customerName, vehicle) {
    var self = this;

    self.customerName = ko.observable(customerName);
    self.vehicle = ko.observable(vehicle);
    self.formattedCost = ko.computed(function () {
        var cost = self.vehicle().vehiclePrice;
        return cost ? "£" + cost.toLocaleString() : "None";
    });
}

function OrdersViewModel() {
    var self = this;

    //Array of data, this would come from the server
    self.availableVehicles = [
        { vehicleName: "Hummer", vehiclePrice: 17995 },
        { vehicleName: "Jeep", vehiclePrice: 35000 },
        { vehicleName: "Land Rover", vehiclePrice: 42995 }
    ];

    self.orders = ko.observableArray([
        new VehicleOrder("Dave", self.availableVehicles[0]),
        new VehicleOrder("Mike", self.availableVehicles[1]),
        new VehicleOrder("Sally", self.availableVehicles[2])
    ]);

    self.addVehicleOrder = function () {
        self.orders.push(new VehicleOrder("", self.availableVehicles[0]));
    }

    self.removeVehicleOrder = function (order) {
        self.orders.remove(order);
    }

    self.orderTotal = ko.computed(function(){
        var total = 0;
        for (var i = 0; i < self.orders().length; i++) {
            total += self.orders()[i].vehicle().vehiclePrice;
        }
        return total;
    });
}

ko.applyBindings(new OrdersViewModel());
