'use strict';
        /**
         * A directive for adding google places autocomplete to a text box
         * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
         *
         * Usage:
         *
         * <input type="text"  ng-autocomplete ng-model="autocomplete" options="options" details="details/>
         *
         * + ng-model - autocomplete textbox value
         *
         * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
         *
         * + options - configuration for the autocomplete (Optional)
         *
         *       + types: type,        String, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
         *       + bounds: bounds,     Google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
         *       + country: country    String, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
         *       + watchEnter:         Boolean, true; on Enter select top autocomplete result. false(default); enter ends autocomplete
         *
         * example:
         *
         *    options = {
         *        types: '(cities)',
         *        country: 'ca'
         *    }
         **/

        angular.module("ngAutocomplete", [])
        .directive('ngAutocomplete', function() {
        return {
        require: 'ngModel',
                scope: {
                    ngModel: '=',
                    options: '=?',
                    details: '=?',
                    address: '=?',
                    postalcode: '=?',
                    city: '=?',
                    lat: '=?',
                    lng: '=?',
                    state:'=?',
                    counter:'=?',
                    custom:'=?'
                },
                link: function(scope, element, attrs, controller) {

                //options for autocomplete
                var opts
                        var watchEnter = false
                        //convert options provided to opts
                        var initOpts = function() {

                        opts = {}
                        if (scope.options) {

                        if (scope.options.watchEnter !== true) {
                        watchEnter = false
                        } else {
                        watchEnter = true
                        }

                        if (scope.options.types) {
                        opts.types = []
                                opts.types.push(scope.options.types)
                                scope.gPlace.setTypes(opts.types)
                        } else {
                        scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                        opts.bounds = scope.options.bounds
                                scope.gPlace.setBounds(opts.bounds)
                        } else {
                        scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                        opts.componentRestrictions = {
                        country: scope.options.country
                        }
                        scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                        scope.gPlace.setComponentRestrictions(null)
                        }
                        }
                        }

                if (scope.gPlace == undefined) {
                scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var result = scope.gPlace.getPlace();
                        var lat = result.geometry.location.lat();
                        var lng = result.geometry.location.lng()
                        // console.log(result.geometry.location.lat());

                if (result !== undefined) {
                    if (result.address_components !== undefined) {
                        scope.$apply(function() {
                        scope.details = result;
                        
                        scope.lat = lat;
                        scope.lng = lng;
                        
                        var locality_name = ''
                        var postal_name = '';
                        var state_name = '';
                        var country_name = '';       
                        angular.forEach(result.address_components, function(value, key){
                            
                            if (value.types.indexOf("administrative_area_level_1") > -1) {
                                state_name = value.long_name;
                               
                            }
        
                            angular.forEach(value.types, function(values, keys){
                                
                                if (values == "postal_code"){
                                    postal_name = value.long_name;
                                }
                                if (values == "locality"){
                                    locality_name = value.long_name;
                                }
                                if(values == "country"){
                                     country_name = value.long_name;    
                                 }
                                
                            });
                        });
                        //scope.address = result.formatted_address;
                        //scope.state = state_name;
                        //scope.postalcode = postal_name;
                       // scope.city = locality_name;
                        scope.custom.location[scope.counter].address = result.formatted_address;      
                        scope.custom.location[scope.counter].city = locality_name;      
                        scope.custom.location[scope.counter].zipcode = postal_name;   
                        scope.custom.location[scope.counter].country = country_name;   
                        scope.custom.location[scope.counter].city = locality_name;           
                        controller.$setViewValue(element.val());
                });
                }
                else {
                if (watchEnter) {
                getPlace(result)
                }
                }
                }
                })

                        //function to get retrieve the autocompletes first result using the AutocompleteService 
                        var getPlace = function(result) {
                        var autocompleteService = new google.maps.places.AutocompleteService();
                       
                                if (result.name.length > 0){
                        autocompleteService.getPlacePredictions(
                        {
                        input: result.name,
                                offset: result.name.length
                        },
                                function listentoresult(list, status) {
                                if (list == null || list.length == 0) {

                                scope.$apply(function() {
                                scope.details = null;
                                console.log("empty hua");
                                });
                                } else {
                                var placesService = new google.maps.places.PlacesService(element[0]);
                                        placesService.getDetails(
                                        {'reference': list[0].reference},
                                                function detailsresult(detailsResult, placesServiceStatus) {

                                                if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                controller.$setViewValue(detailsResult.formatted_address);
                                                        element.val(detailsResult.formatted_address);
                                                        scope.details = detailsResult;
                                                        //on focusout the value reverts, need to set it again.
                                                        var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                                element.unbind('focusout')
                                                        })

                                                });
                                                }
                                                }
                                        );
                                }
                                });
                        }
                        }

                controller.$render = function () {
                var location = controller.$viewValue;
                        element.val(location);
                };
                        //watch options provided to directive
                        scope.watchOptions = function () {
                        return scope.options
                        };
                        scope.$watch(scope.watchOptions, function () {
                        initOpts()
                        }, true);
                }
        };
        });