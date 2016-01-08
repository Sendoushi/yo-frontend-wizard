<?php

$baseUrl = realpath(__DIR__ . '/..') . '/';

// REQUIRES
require $baseUrl . 'composer/autoload.php';

/**
 * Main class
 */
class Main {
    // -----------------------------------------
    // VARS

    private $app = new \Slim\App();
    private $twig;

    // -----------------------------------------
    // PUBLIC FUNCTIONS

    public function __construct() {
        // Create templating system
        $this->setTemplating();

        // Create the app handling
        $this->app = new \Slim\App();

        // Set routes
        $this->setRoutes();

        // Run the application
        $this->app->run();
    }

    /**
     * Gets template
     * @method getTemplate
     * @param  string $route
     * @param  array $data
     * @return string
     */
    public function getTemplate($route, $data = array()) {
        // Get the data needed for the template
        $data = array('the' => 'variables', 'go' => 'here');

        return $this->twig->loadTemplate($route)->render($data);
    }

    // -----------------------------------------
    // PRIVATE FUNCTIONS

    /**
     * Gets app base url
     * @method getBaseUrl
     * @return string
     */
    private function getBaseUrl() {
        return realpath(__DIR__ . '/..') . '/';
    }

    /**
     * Sets twig
     * @method setTwig
     */
    private function setTemplating() {
        $loader = new Twig_Loader_Filesystem($this->getBaseUrl());
        $this->twig = new Twig_Environment($loader, array(
            'cache' => $baseUrl . 'compilation_cache',
        ));
    }

    /**
     * Set app
     * @method setApp
     */
    private function setRoutes() {
        $app = $this->app;
        $appContainer = $app->getContainer();

        // Handle errors
        $appContainer['errorHandler'] = function ($container) {
            return function ($request, $response, $exception) use ($container) {
                // TODO: ...
            };
        };

        // Take care of not found
        $appContainer['notFoundHandler'] = function ($container) {
            return function ($request, $response) use ($container) {
                // TODO: ...
            };
        };

        // Now the other routes
        <%
        function parseRoute(route, base) {
            var routeUrl = base + route.name;

        %>// <%= route.name %>
        $app->get('<%= routeUrl %>', function ($request, $response) {
            // TODO: Set route
        });

        <%

            if (route.children && route.children.length) {
                for (var i = 0; i < route.children.length; i += 1) {
                    parseRoute(route.children[i], routeUrl);
                }
            }
        }

        for (var i = 0; i < routes.length; i += 1) {
            parseRoute(routes[i], '/');
        } %>
    }
}

/* Init all */
$main = new Main();

?>
