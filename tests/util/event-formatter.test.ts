import { EventFormatter } from "../../src/util";

describe("EventFormatter", function () {
    let eventFormatter;

    beforeEach(function () {
        eventFormatter = new EventFormatter("App.Events");
    });

    test("prepends an event with a namespace and replaces dot separators with backslashes", function () {
        let formatted = eventFormatter.format("Users.UserCreated");

        expect(formatted).toBe("App\\Events\\Users\\UserCreated");
    });

    test("does not prepend a namespace when an event starts with a dot", function () {
        let formatted = eventFormatter.format(".App\\Users\\UserCreated");

        expect(formatted).toBe("App\\Users\\UserCreated");
    });

    test("does not prepend a namespace when an event starts with a backslash", function () {
        let formatted = eventFormatter.format("\\App\\Users\\UserCreated");

        expect(formatted).toBe("App\\Users\\UserCreated");
    });

    test("does not replace dot separators when the event starts with a dot", function () {
        let formatted = eventFormatter.format(".users.created");

        expect(formatted).toBe("users.created");
    });

    test("does not replace dot separators when the event starts with a backslash", function () {
        let formatted = eventFormatter.format("\\users.created");

        expect(formatted).toBe("users.created");
    });

    test("does not prepend a namespace when none is set", function () {
        let eventFormatter = new EventFormatter(false);

        let formatted = eventFormatter.format("Users.UserCreated");

        expect(formatted).toBe("Users\\UserCreated");
    });
});
