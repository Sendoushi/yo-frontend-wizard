<?php

/**
 * SdsMain class
 */
class SdsMain {
    // -----------------------------------------
    // VARS

    private $twig;

    // -----------------------------------------
    // PUBLIC FUNCTIONS

    public function __construct() {
        // REQUIRES
        require $this->getBaseUrl() . 'composer/autoload.php';

        $this->setTwig();
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
    private function setTwig() {
        $loader = new Twig_Loader_Filesystem($this->getBaseUrl());
        $this->twig = new Twig_Environment($loader, array(
            'cache' => $this->getBaseUrl() . 'compilation_cache',
        ));
    }
}

/* Init all */
$sdsMain = new SdsMain();

?>
