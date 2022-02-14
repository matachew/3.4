// JavaScript Document
 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

 	// The require function
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId])
 			return installedModules[moduleId].exports;

 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			exports: {},
 			id: moduleId,
 			loaded: false
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.loaded = true;

 		// Return the exports of the module
 		return module.exports;
 	}


 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// __webpack_public_path__
 	__webpack_require__.p = "";

 	// Load entry module and return exports
 	return __webpack_require__(0);
 })
/************************************************************************/
 ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var $ = __webpack_require__(1),
		_ = __webpack_require__(2),
		Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Options = __webpack_require__(4),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6),
		Cart = __webpack_require__(7);
	
	
	/** 
	 *	Require component
	 */
	 
	var	Controller = __webpack_require__(8),
		TemplateOptions = __webpack_require__(10);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  МОДУЛЬ КОРЗИНЫ                                                                          ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
		/** 
		 *	@private static vars
		 */
		 
		var	c = null,
			e = null;
	
		
		var CartModule = function (params)
		{
	
	
			// экземпляр singleton
			if (c || e) return;
	
	
	
			// СОЗДАЕТ ОБЪЕКТ С НАСТРОЙКАМИ КОРЗИНЫ
			// ---------------------------------------------------------------------------------
	
			// контейнер для настроек корзины
			TemplateOptions.vars = {}; 
	
			// расширяет контейнер объектами "Options.defaults", "TemplateOptions.defaults" и "params"
			$.extend( true, TemplateOptions.vars, Options.defaults, TemplateOptions.defaults,
				params && typeof params === 'object' || typeof params === 'function' ? params : {} );
	
	
	
			// СОЗДАЕТ КОНТРОЛЛЕР (ТОЧКА ВХОДА)
			// ---------------------------------------------------------------------------------
	
			c = new Controller();
	
	
	
			// ПРИВАТНЫЕ МЕТОДЫ
			// ---------------------------------------------------------------------------------
	
			/** 
			 *	@private
			 *	Освобождает ресурсы модуля
			 */
	
			var onDisposed = function ()
			{
				e.stopListening();
				TemplateOptions.vars = null;
				c = null;
				e = null;
			}
	
	
	
			// СЛУШАТЕЛИ
			// ---------------------------------------------------------------------------------
	
			e = _.extend({}, Backbone.Events);
			e.listenTo(Lifecycle, LifecycleEvent.DISPOSED, _.bind(onDisposed, this));
		};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  API МОДУЛЯ                                                                          │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			CartModule.prototype = 
			{
				/**
				 *	Добавляет продукт в список корзины
				 */
	
				addToCart: function (item)
				{
					Cart.addTo('cartlist', item);
				},
	
	
				/**
				 *	Добавляет продукт в список отложенных товаров
				 */
				 
				addToWish: function (item)
				{
					TemplateOptions.vars.iswish && Cart.addTo('wishlist', item);
				},
	
	
				/** 
				 *	Показывает панель
				 */
	
				show: function (section)
				{
					var s = section ? section : 'cart';
					Lifecycle.next(LifecycleEvent.SHOW, s);
				},
	
	
				/**
				 *	Скрывает панель
				 */
				
				hide: function ()
				{
					Lifecycle.next(LifecycleEvent.HIDE);
				},
	
	
				/**
				 *	Скрывает компоненты корзины и освобождает ресурсы модуля
				 */
				
				destroy: function ()
				{
					Lifecycle.next(LifecycleEvent.DISPOSE);
				}
	
			};
	
	
	window.CartModule = CartModule;
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Backbone;

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  КОНФИГУРАЦИЯ КОРЗИНЫ                                                                    ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		module.exports = {
	
			defaults: {
	
				/** 
				 *	Формат валюты [usd]
				 */
				
				currency: 'usd',
				
				
				/** 
				 *	Поддержка нескольких едениц одного товара
				 */
	
				ismultiple: false,
				
				
				/** 
				 *	Поддержка списка отложенных товаров
				 */
	
				iswish: false,
				
				
				/** 
				 *	Подгружаемые шрифты
				 */
	
				googlefonts: ['Montserrat:400,700', 'Montserrat Alternates:400,700'],
				
				
				/** 
				 *	Ссылка на чекаут для отправки содержимого корзины
				 */
	
				checkout: 'https://xyz.cart.com/xx-user-id/checkout?pay=true&sem=0089323114',
				
				
				/** 
				 *	Внешние обработчики
				 */
	
				onready: null, onshow: null, onhide: null, onenter: null, onexit: null, ondispose: null, ondisposed: null
	
			}
		};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var _ = __webpack_require__(2),
		Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	//var	LifecycleEvent = require('./LifecycleEvent');
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ЖИЗНЕННЫЙ ЦИКЛ КОРЗИНЫ                                                                  ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var Lifecycle = function ()
		{
			this._state = '';
		};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  API LIFECYCLE                                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Lifecycle.prototype, Backbone.Events,
			{
	
				/** 
				 *	Меняет состояние
				 */
	
				next: function (state)
				{
					var a = Array.prototype.slice.call(arguments);
	
					if (_.isString(state)) {
						this._state = state;
						this.trigger.apply(this, a);
					}
				},
	
				
				/** 
				 *	Возвращает текущее состояние
				 */
	
				current: function ()
				{
					return this._state;
				}
	
			});
	
	
	module.exports = new Lifecycle();
	
	
	


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  LIFECYCLE EVENTS                                                                        ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		module.exports = {
			ACTIVATE:			"lifecycle.event:Activate",
			DEACTIVATE:			"lifecycle.event:Deactivate",
			EMPTY:				"lifecycle.event:Empty",
			READY:				"lifecycle.event:Ready",
			SHOW:				"lifecycle.event:Show",
			HIDE:				"lifecycle.event:Hide",
			ENTER:				"lifecycle.event:Enter",
			EXIT:				"lifecycle.event:Exit",
			DISPOSE:			"lifecycle.event:Dispose",
			DISPOSED:			"lifecycle.event:Disposed"
		};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var _ = __webpack_require__(2);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Options = __webpack_require__(4);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ПРОДУКТ                                                                                 ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var Item = Backbone.Model.extend(
		{
			defaults: function () 
			{
				return {
	
					id: '',			// идентификатор продукта
					price: 0,		// цена продукта (float)
					quantity: 1,	// кол-во едениц по умолчанию
	
					title: '',		// название продукта
					img: '',		// картинка продукта (абсолютная ссылка)
					url: ''			// карточка продукта (абсолютная ссылка)
				}
			}
		});
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  СПИСОК ПРОДУКТОВ                                                                        ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var List = Backbone.Collection.extend(
		{
			model: Item,
			multiple: false,
			label: '',
			
	
			initialize: function (params)
			{
				this.multiple = params.multiple;
				this.label = params.id;
				this.localStorage = new Backbone.LocalStorage('cart.storage:' + this.label);
			},
	
	
			/**
			 *	Обновляет и возвращает объект stats:
			 *	@totalItems кол-во продуктов
			 *	@totalQuantity итоговое кол-во едениц
			 *	@totalCost итоговая цена
			 */
	
			getStats: function ()
			{
				var stats = {};
					stats.totalItems = this.models.length;
					stats.totalQuantity = 0;
					stats.totalCost = 0;
	
				this.models.length > 0 && this.each(function(m) {
					stats.totalQuantity += m.get('quantity');
					stats.totalCost += m.get('price') * m.get('quantity');
				}, this);
	
				return stats;
			}
		});
	
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  КОРЗИНА                                                                                 ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var Cart = function() 
		{
			this.list = {}; // хеш списков
			this.item = Item;
		};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  API КОРЗИНЫ                                                                         │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Cart.prototype, Backbone.Events,
			{
	
				/**
				 *	Освобождает ресурсы хелпера
				 */
	
				dispose: function ()
				{
					this.list = null;
				},
	
	
				/**
				 *	Кол-во списков
				 */
	
				length: function ()
				{
					return _.values(this.list).length;
				},
	
				
				/**
				 *	Создает список
				 *	@key:string идентификатор списка
				 */
	
				createList: function (key, multiple)
				{
					if (!this.list[key]) {
						this.list[key] = new List({ id: key, multiple: multiple });
					}
	
					return this.list[key];
				},
	
				
				/**
				 *	1.	Возвращает конкретный список - getList(list id)
				 *		@key:string идентификатор списка
				 *	
				 *	2.	Возвращает массив всех списков - getList()
				 */
	
				getList: function (key)
				{
					return key ? this.list[key] : _.values(this.list);
				},
	
				
				/**
				 *	Удаляет все элементы из списка
				 *	@key:string идентификатор списка
				 */
	
				clearList: function (key)
				{
					if (!this.list[key]) {
						return;
					}
	
					_.chain(this.list[key].models).clone().each(function(model) {
						model.destroy();
					});
				},
	
	
				/**
				 *	Удаляет список
				 *	@key:string идентификатор списка
				 */
	
				removeList: function (key)
				{
					if (!this.list[key]) {
						return;
					}
	
					this.list[key] = null;
				},
	
	
				/**
				 *	Добавляет продукт в список
				 *	@to:string идентификатор списка
				 *	@model:object модель
				 */
	
				addTo: function (to, model)
				{
					if (!this.list[to]) {
						return
					}
	
					var l = this.list[to],
						m = l.get(model.id);
	
					if (!m) {
						l.create(model);
					} else {
						if (l.multiple) {
							m.set({ quantity: m.attributes.quantity + 1 });
							m.save();
						}
					}
				},
	
	
				/**
				 *	Перемещаяет продукт из списка from в список to
				 *	@from:string идентификатор списка
				 *	@to:string идентификатор списка
				 *	@id:string идентификатор модели
				 */
	
				moveTo: function (from, to, id)
				{
					if (!this.list[from] || !this.list[to] || !id) {
						return;
					}
	
					var m = this.list[from].get(id);
	
					if (m) {
						this.addTo(to, m.clone());
						this.removeFrom(from, m.id);
					}
				},
	
	
				/**
				 *	Удаляет продукт из списка from
				 *	@from:string идентификатор списка
				 *	@id:string идентификатор модели
				 */
	
				removeFrom: function (from, id)
				{
					if (!this.list[from] || !id) {
						return;
					}
	
					var m = this.list[from].get(id);
						m && m.destroy();
				},
	
	
				/**
				 *	Возвращает true если все списки пустые
				 */
	
				isEmpty: function ()
				{
					for(var p in this.list) 
					{
						if (!this.list[p].isEmpty()) {
							return false;
						}
					}
	
					return true;
				}
			});
	
	
	module.exports = new Cart();
	
	
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var $ = __webpack_require__(1),
		_ = __webpack_require__(2),
		Backbone = __webpack_require__(3),
		webfont = __webpack_require__(9);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Cart = __webpack_require__(7),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6);
	
	
	/** 
	 *	Require component
	 */
	 
	var Options = __webpack_require__(10),
		Hooks = __webpack_require__(30),
		Animator = __webpack_require__(11),
		PanelView = __webpack_require__(13),
		TintView = __webpack_require__(21),
		ButtonView = __webpack_require__(22);
	
	
	/** 
	 *	Require template
	 */
	 
	var	WrapperHTML = __webpack_require__(24);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  КОНТРОЛЛЕР                                                                              ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var Controller = function () 
		{
	
	
			this.isactive = false;
			this.iswish = Options.vars.iswish;
			this.isempty = false;
	
	
	
			// СОЗДАЕТ СПИСКИ
			// ---------------------------------------------------------------------------------
	
			this.cartlist = Cart.createList('cartlist', Options.vars.ismultiple);
			this.wishlist = this.iswish ? Cart.createList('wishlist', false) : null;
	
			this.cartlistReceived = false;
			this.wishlistReceived = false;
	
	
	
			// ПОДКЛЮЧАЕТ СТИЛИ
			// ---------------------------------------------------------------------------------
	
			__webpack_require__(25);
			$('head > style').last().attr('id', 'cart-style');
	
	
	
			// ПОДКЛЮЧАЕТ ШРИФТЫ
			// ---------------------------------------------------------------------------------
	
			webfont.load({
				google: { families: Options.vars.googlefonts },
				classes: false, events: false
			});
	
			$('head > link').last().attr('id', 'cart-webfont');
	
	
	
			// ПОДКЛЮЧАЕТ ОСНОВНОЙ КОНТЕЙНЕР
			// ---------------------------------------------------------------------------------
	
			$(WrapperHTML()).prependTo('body');
	
			
	
			// СОЗДАЕТ КОМПОНЕНТЫ
			// ---------------------------------------------------------------------------------
	
			this.button = new ButtonView({ el: '.cart-button' });
			this.panel = new PanelView({ el: '.cart-panel' });
			this.tint = new TintView({ el: '.cart-tint' });
	
			this.animator = new Animator(this);
			this.hooks = new Hooks();
	
	
	
			// СЛУШАЕТ СОБЫТИЯ LIFECYCLE
			// ---------------------------------------------------------------------------------
	
			this.listenTo(Lifecycle, LifecycleEvent.ACTIVATE, this.onActivate);
			this.listenTo(Lifecycle, LifecycleEvent.DEACTIVATE, this.onDeactivate);
			this.listenTo(Lifecycle, LifecycleEvent.READY, this.onReady);
			this.listenTo(Lifecycle, LifecycleEvent.EMPTY, this.onEmpty);
			this.listenTo(Lifecycle, LifecycleEvent.SHOW, this.onShow);
			this.listenTo(Lifecycle, LifecycleEvent.HIDE, this.onHide);
			this.listenTo(Lifecycle, LifecycleEvent.ENTER, this.onEnter);
			this.listenTo(Lifecycle, LifecycleEvent.EXIT, this.onExit);
			this.listenTo(Lifecycle, LifecycleEvent.DISPOSE, this.onDispose);
			this.listenTo(Lifecycle, LifecycleEvent.DISPOSED, this.onDisposed);
	
	
			
			// СЛУШАЕТ RESET В СПИСКАХ
			// ---------------------------------------------------------------------------------
	
			this.listenToOnce(this.cartlist, 'reset', this.onStartup);
			this.iswish && this.listenToOnce(this.wishlist, 'reset', this.onStartup);
	
	
			
			// ЗАПОЛНЯЕТ СПИСКИ ДАННЫМИ
			// ---------------------------------------------------------------------------------
	
			this.cartlist.fetch({ reset: true });
			this.iswish && this.wishlist.fetch({ reset: true });
		};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ОБРАБОТЧИКИ СОБЫТИЙ LYFECYCLE                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Controller.prototype,
			{
	
				/** 
				 *	Запускает lifecycle
				 *	инициирует: this.cartlist:reset, this.wishlist:reset
				 */
	
				onStartup: function (e)
				{
					if (e.label == 'cartlist') {
						this.cartlistReceived = true;
					}
	
					if (e.label == 'wishlist') {
						this.wishlistReceived = true;
					}
	
					if (this.cartlistReceived && (this.wishlistReceived || !this.wishlist)) 
					{
						if (this.cartlist.models.length > 0 || (this.wishlist && this.wishlist.models.length > 0)) 
						{
							Lifecycle.next(LifecycleEvent.ACTIVATE);
						} else {
							Lifecycle.next(LifecycleEvent.DEACTIVATE, LifecycleEvent.EMPTY);
						}
					}
				},
	
	
				/** 
				 *	Активирует корзину
				 *	инициирует: this.onStartup, this.cartlist:add, this.cartlist:add
				 */
	
				onActivate: function ()
				{
					if (this.active) return;
	
					if (this.isempty) {
						this.isempty = false;
						this.stopListening(this.cartlist, 'add');
						this.iswish && this.stopListening(this.wishlist, 'add');
					}
	
					this.isactive = true;
	
					// активирует рендер кнопки
					this.button.activateRendering();
	
					// деактивирует панель
					this.panel.deactivateInteraction();
					this.panel.deactivateRendering();
	
					// деактивирует тинт
					this.tint.deactivateInteraction();
	
					// запускает анимацию активации
					this.animator.activate();
				},
	
	
				/** 
				 *	Оповещает о готовности корзины после активации
				 *	инициирует: this.animator
				 */
	
				onReady: function ()
				{
					// активирует кнопку
					this.button.activateInteraction();
				},
	
	
				/** 
				 *	Деактивирует корзину
				 *	инициирует: this.onStartup, this.onHide
				 */
	
				onDeactivate: function (reason)
				{
					this.isactive = false;
	
					// деактивирует кнопку
					this.button.deactivateInteraction();
					this.button.deactivateRendering();
	
					// деактивирует панель
					this.panel.deactivateInteraction();
					this.panel.deactivateRendering();
	
					// деактивирует тинт
					this.tint.deactivateInteraction();
	
					// запускает анимацию деактивации
					this.animator.deactivate(reason);
				},
	
	
				/** 
				 *	Оповещает о деактивации пустой корзины
				 *	инициирует: this.animator
				 */
	
				onEmpty: function ()
				{
					this.isempty = true;
					this.listenTo(this.cartlist, 'add', this.onActivate);
					this.iswish && this.listenTo(this.wishlist, 'add', this.onActivate);
				},
	
	
				/** 
				 *	Показывает панель
				 *	инициирует: this.button, api
				 */
	
				onShow: function (section)
				{
	
					var section = section ? section : 'cart';
	
					// деактивирует полностью кнопку
					this.button.deactivateInteraction();
					this.button.deactivateRendering();
	
					// активирует рендер панели
					this.panel.activateRendering(section);
	
					// показывает панель
					this.animator.show();
	
	
					document.body.addEventListener('touchmove', this._ontouchmove);
	
					$('body').addClass('block');
				},
	
				_ontouchmove: function (e)
				{
					if(!$(e.target).hasClass("scrollable")) {
						e.preventDefault();
					}
				},
	
	
				/** 
				 *	Оповещает о том, что плавающая кнопка скрылась и панель появилась
				 *	инициирует: this.animator
				 */
	
				onEnter: function ()
				{
					// активирует панель и тинт
					this.panel.activateInteraction();
					this.tint.activateInteraction();
				},
	
	
				/** 
				 *	Скрывает панель
				 *	инициирует: this.button, api
				 */
	
				onHide: function ()
				{
					// активирует рендер кнопки
					this.button.activateRendering();
	
					// деактивирует панель и тинт
					this.panel.deactivateInteraction();
					this.panel.deactivateRendering();
					this.tint.deactivateInteraction();
	
					if (this.cartlist.models.length > 0 || (this.wishlist && this.wishlist.models.length > 0)) 
					{
						// запускает анимацию
						this.animator.hide();
					} else {
						Lifecycle.next(LifecycleEvent.DEACTIVATE, LifecycleEvent.EMPTY);
					}
	
					document.body.removeEventListener('touchmove', this._ontouchmove);
					$('body').removeClass('block');
				},
	
	
				/** 
				 *	Оповещает о том, что панель скрылась и плавающая кнопка появилась
				 *	инициирует: this.animator
				 */
	
				onExit: function ()
				{
					// активирует кнопку
					this.button.activateInteraction();
				},
	
	
				/** 
				 *	Скрывает все перед разрушением
				 *	инициирует: api
				 */
	
				onDispose: function ()
				{
					// дективирует все
					this.button.deactivateInteraction();
					this.button.deactivateRendering();
					this.panel.deactivateInteraction();
					this.panel.deactivateRendering();
					this.tint.deactivateInteraction();
	
					// дективирует панель
					this.animator.dispose();
				},
	
	
				/** 
				 *	Освобождает ресурсы и зачищает DOM
				 *	инициирует: this.animator
				 */
	
				onDisposed: function ()
				{
	
					// перестает слушать события
					this.stopListening();
	
					// разрушает hooks
					this.hooks.destroy();
	
					// обнуляет ссылки на компоненты
					this.hooks = null;
					this.animator = null;
					this.panel = null;
					this.tint = null;
					this.button = null;
					this.cartlist = null;
					this.wishlist = null;
	
	
					// удаляет из head шрифты и стили
					$('#cart-style').remove();
					$('#cart-webfont').remove();
	
	
					// удаляет списки
					Cart.removeList('cartlist');
					Cart.removeList('wishlist');
	
	
					// удаляет контейнер
					$('.cart-wrapper').remove();
				}
			});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  РАСШИРЯЕТ BACKBONE EVENTS                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Controller.prototype, Backbone.Events);
	
	
	module.exports = Controller;
	
	
	


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = WebFont;

/***/ },
/* 10 */
/***/ function(module, exports) {

	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  КОНФИГУРАЦИЯ ШАБЛОНА                                                                    ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		module.exports = {
	
			defaults: {
	
				/** 
				 *	Анимация корзины
				 */
				
				animation: {
	
					/** 
					 *	Настройка плавующей кнопки 
					 */
	
					button: {
						TransitionIN: { y: 0, opacity: 1, display: 'block', delay: 0.2, ease: Back.easeOut.config(1) },
						DurationIN: 0.3,
						TransitionOUT: { y: -200, opacity: 0, display: 'none', ease: Back.easeIn.config(3) },
						DurationOUT: 0.3
					},
			
			
					/** 
					 *	Настройка панели
					 */
	
					panel: {
						TransitionIN: { xPercent: 0, display:'block', ease: Power1.easeOut, delay: 0.3 },
						DurationIN: 0.3,
						TransitionOUT: { xPercent: 100, display:'none' },
						DurationOUT: 0.3
					},
	
	
					/** 
					 *	Настройка тинт 
					 */
	
					tint: {
						TransitionIN: { opacity: 1, display: 'block', ease: Power1.easeOut, delay: 0.3 },
						DurationIN: 0.3,
						TransitionOUT: { opacity: 0, display: 'none' },
						DurationOUT: 0.3
					}
				}
	
			}
		};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var $ = __webpack_require__(1),
		_ = __webpack_require__(2);
		TweenMax = __webpack_require__(12);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Options = __webpack_require__(10),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6),
		Cart = __webpack_require__(7);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  АНИМАТОР                                                                                ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		
		var Animator = function (controller)
		{
			this.$tint = controller.tint.$el;
			this.$button = controller.button.$el;
			this.$panel = controller.panel.$el;
	
			this.animation = Options.vars.animation;
		};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  API АНИМАТОРА                                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Animator.prototype, Backbone.Events,
			{
				
				activate: function ()
				{
					TweenMax.set(this.$button, this.animation.button.TransitionOUT);
					
					TweenMax.to(this.$button, this.animation.button.DurationIN, _.extend({}, this.animation.button.TransitionIN, { 
						onComplete: _.bind(this._ready, this),
						delay: 0 
					}));
				},
	
				_ready: function ()
				{
					Lifecycle.next(LifecycleEvent.READY);
				},
				
	
	
				deactivate: function (reason)
				{
					Lifecycle.next(reason);
	
					TweenMax.to(this.$button, this.animation.button.DurationOUT, this.animation.button.TransitionOUT);
					TweenMax.to(this.$tint, this.animation.tint.DurationOUT, this.animation.tint.TransitionOUT);
					TweenMax.to(this.$panel, this.animation.panel.DurationOUT, this.animation.panel.TransitionOUT);
				},
	
	
	
				show: function ()
				{
					TweenMax.set(this.$tint, this.animation.tint.TransitionOUT);
					TweenMax.set(this.$panel, this.animation.panel.TransitionOUT);
	
					TweenMax.to(this.$button, this.animation.button.DurationOUT, this.animation.button.TransitionOUT);
					TweenMax.to(this.$tint, this.animation.tint.DurationIN, this.animation.tint.TransitionIN);
					TweenMax.to(this.$panel, this.animation.panel.DurationIN, _.extend({}, this.animation.panel.TransitionIN, { 
						onComplete: _.bind(this._enter, this) 
					}));
				},
	
	
				_enter: function ()
				{
					Lifecycle.next(LifecycleEvent.ENTER);
				},
	
	
	
				hide: function ()
				{
					TweenMax.to(this.$panel, this.animation.panel.DurationOUT, this.animation.panel.TransitionOUT);
					TweenMax.to(this.$tint, this.animation.tint.DurationOUT, this.animation.tint.TransitionOUT);
	
					TweenMax.to(this.$button, this.animation.button.DurationIN, _.extend(this.animation.button.TransitionIN, { 
						onComplete: _.bind(this._exit, this) 
					}));
				},
	
				_exit: function ()
				{
					Lifecycle.next(LifecycleEvent.EXIT);
				},
	
	
	
				dispose: function ()
				{
					// animation out
					// ..
	
					this._disposed();
	
				},
	
				_disposed: function ()
				{
					Lifecycle.next(LifecycleEvent.DISPOSED);
				}
			});
	
	
	module.exports = Animator;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = TweenMax;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var _ = __webpack_require__(2),
		Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Cart = __webpack_require__(7),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6),
		Utils = __webpack_require__(14);
	
	
	/** 
	 *	Require component
	 */
	 
	var Options = __webpack_require__(10),
		SectionView = __webpack_require__(15);
	
	
	/** 
	 *	Require HTML template
	 */
	 
	var	HeaderHTML = __webpack_require__(18);
	var ContentHTML = __webpack_require__(19);
	var FooterHTML = __webpack_require__(20);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ПАНЕЛЬ                                                                                  ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var PanelView = Backbone.View.extend(
		{
	
			/** Interaction events */
	
			events: {
				'click .cp-back' : 'hidePanel',
				'click .cart-tab' : 'selectCartSection',
				'click .wish-tab' : 'selectWishSection'
			},
	
	
			initialize: function ()
			{
				this.iswish = Options.vars.iswish;
				this.currency = Options.vars.currency;
	
				this.cartList = Cart.getList('cartlist');
				this.wishList = Cart.getList('wishlist');
	
				this.section = 'cart';
	
	
				this.$el.append(HeaderHTML({ iswish: this.iswish }));
				this.$el.append(ContentHTML({ iswish: this.iswish }));
				this.$el.append(FooterHTML());
	
	
				this.$headerTotalCostLabel = $('.cart-tab .cp-tab-label');
				this.$headerTotalWishLabel = this.iswish ? $('.wish-tab .cp-tab-label') : null;
				this.$checkoutButton = $('.cp-checkout-btn');
	
	
				this.cartSection = new SectionView({ el: '.cp-section-cart', list: this.cartList, panel: this });
				this.wishSection = this.iswish ? new SectionView({ el: '.cp-section-wish', list: this.wishList, panel: this }) : null;
	
			},
	
	
	
			/** 
			 *	Меняет секцию
			 */
	
			change: function (section)
			{
				
				this.section = section;
	
	
				var cartListStats = this.cartList.getStats();
				this.$checkoutButton.toggleClass('hidden', cartListStats.totalItems == 0 || this.section != 'cart' ? true : false);
	
				// переключает секции
				this.$el.toggleClass('cp-section_cart', this.section == 'cart');
				this.iswish && this.$el.toggleClass('cp-section_wish', this.section == 'wish');
	
				// переключает табы
				$('.cart-tab').toggleClass('gs-tab-selected', this.section == 'cart');
				this.iswish && $('.wish-tab').toggleClass('gs-tab-selected', this.section == 'wish');
	
	
				this.section == 'cart' ? this.cartSection.activate() : this.cartSection.deactivate();
				this.iswish ? this.section == 'wish' ? this.wishSection.activate() : this.wishSection.deactivate() : null;
	
			}
			
		});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  INTERACTION                                                                         │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(PanelView.prototype,
			{
				/**
				 *	Скрывает панель
				 */
	
				hidePanel: function ()
				{
					Lifecycle.next(LifecycleEvent.HIDE);
				},
	
	
				/**
				 *	Выбирает таб корзины
				 */
	
				selectCartSection: function ()
				{
					this.section != 'cart' && this.change('cart');
				},
	
	
				/**
				 *	Выбирает таб отложенных товаров
				 */
	
				selectWishSection: function ()
				{
					this.section != 'wish' && this.change('wish');
				},
	
	
				/**
				 *	Активирует взаимодействие
				 */
	
				activateInteraction: function ()
				{
					this.delegateEvents(this.events);
				},
	
	
				/**
				 *	Деактивирует взаимодействие
				 */
	
				deactivateInteraction: function ()
				{
					this.undelegateEvents();
				},
			});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  RENDERING                                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(PanelView.prototype,
			{
				/**
				 *	Активирует рендер
				 */
	
				activateRendering: function (section)
				{
					this.cartSection.clear();
					this.iswish && this.wishSection.clear();
	
					setTimeout(_.bind(function () 
					{
						this.change(section);
					}, this), 350);
	
					this.listenTo(this.cartList, 'destroy change add reset', this.render);
					this.iswish && this.listenTo(this.wishList, 'destroy change add reset', this.render);
					this.render();
				},
	
	
				/**
				 *	Деактивирует рендер
				 */
	
				deactivateRendering: function ()
				{
					this.stopListening(this.cartList);
					this.iswish && this.stopListening(this.wishList);
					this.section == 'cart' && this.cartSection.deactivate();
					this.iswish && this.section == 'wish' && this.wishSection.deactivate();
				},
	
	
				/**
				 *	Рендер представления
				 */
	
				render: function ()
				{
					var cartListStats = this.cartList.getStats(),
						wishListStats = this.iswish ? this.wishList.getStats() : null;
	
					// обновляет данные табов
					this.$headerTotalCostLabel.html(Utils.format(cartListStats.totalCost, this.currency));
					this.$headerTotalWishLabel && this.$headerTotalWishLabel.html(wishListStats ? wishListStats.totalItems : 0);
	
					// отображает или скрывает кнопку чекаута
					this.$checkoutButton.toggleClass('hidden', cartListStats.totalItems == 0 || this.section != 'cart' ? true : false);
				}
			});
	
	
	module.exports = PanelView;
	
	
	


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	
	
	/** 
	 *	Currency
	 */
	 
	var	currencyFormat = {
		'usd': { before: '$', after: '', divider: ',', n: 2, x: 3 },
		'rub': { before: '', after: ' руб.', divider: ' ', n: 0, x: 3 }
	};
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  UTILS                                                                                   ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		module.exports = {
	
		
			/**
			 *	Форматирует значение цены и возвращает ее строковое представление
			 *	@params {
			 *		number:number 	значение цены
			 *		currency:string символ валюты
			 *		before:string 
			 *		currency:string символ валюты
			 *		divider:string 	разделитель нулей
			 *		n:number 		кол-во символов в остатке (копейки, центы и т.д.)
			 *		x:number 		делитель тысячных
			 *	}
			 *	
			 *	@return string ($5,000.00)
			 *	
			 *	пример: format(10000, '$', 'before', ',', 2, 3) // return $10,000.00
			 *	пример: format(10000, ' РУБ.', 'after', ' ', 0, 3) // return 10 000 РУБ.
			 *	¥1,430,000
			 */
	
			format: function(price, currency)
			{
				// params
				var p = currencyFormat[currency];
				var number = parseFloat(price);
				var r = '\\d(?=(\\d{' + (p.x || 3) + '})+' + (p.n > 0 ? '\\.' : p.currency) + ')';
				return p.before + '' + number.toFixed(Math.max(0, ~~p.n)).replace(new RegExp(r, 'g'), '$&' + p.divider) + '' + p.after;
			}
	
			//number, placed, currency, devider, n, x
	
	
	
		};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var _ = __webpack_require__(2),
		Backbone = __webpack_require__(3),
		IScroll = __webpack_require__(16);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6);
	
	
	/** 
	 *	Require component
	 */
	 
	var Options = __webpack_require__(10),
		CartSectionItem = __webpack_require__(31),
		WishSectionItem = __webpack_require__(32);
	
	
	/** 
	 *	Require HTML template
	 */
	 
	var	EmptyHTML = __webpack_require__(35);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  СЕКЦИЯ ПАНЕЛИ                                                                           ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var SectionView = Backbone.View.extend(
		{
			initialize: function (options)
			{
				this.isempty = false;
				this.list = options.list;
				this.panel = options.panel;
				this.iswish = Options.vars.iswish;
				//this.listenTo(this.list, 'add', this.insertItem);
				//this.listenTo(this.list, 'reset', this.insertItems);
				this.$list = this.$el.find('.cp-section-list');
				//console.log();
				
	
				this.scroller = new IScroll('.' + this.el.className + ' .cp-section-wrapper', {
					mouseWheel: true,
					scrollbars: true,
					fadeScrollbars: true,
					interactiveScrollbars: true,
					resizeScrollbars: true,
					shrinkScrollbars: true,
					bounce: true,
					directionLockThreshold: 5,
					bounceTime: 600,
					snapThreshold: 0.334,
					click: true,
					deceleration: 0.0006,
					probeType: 3,
					scrollbars: 'custom'
				});
				
	
				this.scroller.on('flick', _.bind(function(e){
					if (Math.abs(this.scroller.distX) > 60) {
						if (this.scroller.distX > 0) {
							// right direction 
							this.el.className == 'cp-section-cart' && this.panel.hidePanel();
							this.iswish && this.el.className == 'cp-section-wish' && this.panel.selectCartSection();
						} else {
							// left direction
							this.iswish && this.el.className == 'cp-section-cart' && this.panel.selectWishSection();
						}
					}
				}, this));
	
				
				this.deactivate();
			},
	
			activate: function ()
			{
				this.insertItems();
	
				setTimeout(_.bind(function () 
				{
					var someClassName = '.' + this.el.className + ' .cp-item-wrapper';
					TweenMax.staggerTo(someClassName, 0.3, { className: '+=active', ease: Power4.easeIn }, 0.025);
	
					this.delegateEvents(this.events);
					this.scroller.scrollTo(0, 0);
					this.scroller.enable();
					this.refresh();
	
				}, this), 50);
	
				this.setEmpty();
	
				this.listenTo(Lifecycle, LifecycleEvent.ENTER, _.bind(this.refresh, this));
				this.listenTo(this.list, 'destroy', _.bind(this.itemDestroy, this));
	
	
			},
	
			itemDestroy: function ()
			{
				this.refresh();
				this.setEmpty();
			},
	
			deactivate: function ()
			{
				this.undelegateEvents();
				this.scroller.disable();
				this.stopListening();
			},
	
			insertItem: function (item)
			{
				var o = { model: item },
					view = this.el.className == 'cp-section-cart' ? new CartSectionItem(o) : new WishSectionItem(o);
	
				this.$list.append(view.render().el);
			},
	
			insertItems: function ()
			{
				this.clear();
				this.list.each(this.insertItem, this);
				
			},
	
			clear: function ()
			{
				this.$list.html('');
			},
	
			refresh: function ()
			{
				this.scroller.refresh();
			},
	
			setEmpty: function ()
			{
				$('.' + this.el.className + ' .cp-empty-section').remove();
	
				if (this.list.getStats().totalItems < 1)
				{
					$('.' + this.el.className + ' .cp-section-wrapper').append(EmptyHTML({ 
						message: "Your " + (this.el.className == 'cp-section-cart' ? "shopping cart" : "wish list") + " is empty." 
					}));
				}
	
				setTimeout(_.bind(function () 
				{
					$('.' + this.el.className + ' .cp-empty-section').addClass('active');
	
				}, this), 250);
			}
		});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  RENDERING                                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(SectionView.prototype,
			{
				/**
				 *	Рендер представления
				 */
	
				render: function ()
				{
					//
				}
			});
	
	
	module.exports = SectionView;
	
	
	


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = IScroll;

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<header class="cp-header gs-tabs">\n	<ul>\n		<li class="cp-back">\n			<span class="cp-tab-ic">\n				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><polyline points="14.7,25.7 5,16 14.7,6.3"/><line x1="5.3" y1="16" x2="27" y2="16"/></g></svg>\n			</span>\n		</li>\n		<li class="cp-tabs">\n			<ul>\n				<li class="cart-tab">\n					<div class="cp-tab-wrapper">\n						<span class="cp-tab-ic">\n							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><path d="M25.4,29H6.6c-1.7,0-3-1.4-2.8-2.9l1.9-13.8C5.9,11,6.6,10,8,10h16c1.4,0,2.1,1,2.3,2.3l1.9,13.8 C28.4,27.6,27.1,29,25.4,29z"/><path d="M10.6,12.7V8.4C10.6,5.4,13,3,16,3h0c3,0,5.4,2.4,5.4,5.4v4.3"/></g></svg>\n						</span>\n						<span class="cp-tab-label">$0.00</span>\n					</div>\n				</li>\n				';
	 if (iswish) { ;
	__p += '\n				<li class="wish-tab">\n					<div class="cp-tab-wrapper">\n						<span class="cp-tab-ic">\n							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <path d="M22.6,6.5c-2.9,0-5.4,1.7-6.6,4.1c-1.2-2.4-3.7-4.1-6.6-4.1C5.3,6.5,2,9.8,2,13.9C2,23.7,15.8,29,15.8,29 S30,23.6,30,13.9C30,9.8,26.7,6.5,22.6,6.5L22.6,6.5z"/></svg>\n						</span>\n						<span class="cp-tab-label">0</span>\n					</div>\n				</li>\n				';
	 } ;
	__p += '\n			</ul>\n			';
	 if (iswish) { ;
	__p += '\n			<span class="cp-tab-cursor p-color"></span>\n			';
	 } ;
	__p += '\n		</li>\n	</ul>\n</header>';
	
	}
	return __p
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="cp-container gs-container">\n	<ul';
	 if (iswish) { print(' class="cp-sections"') } ;
	__p += '>\n		<li class="cp-section-cart">\n			<div class="cp-section-wrapper">\n				<div class="cp-section-content">\n					<span class="cp-section-top"></span>\n					<ul class="cp-section-list"></ul>\n					<span class="cp-section-bottom"></span>\n				</div>\n			</div>\n		</li>\n		';
	 if (iswish) { ;
	__p += '\n		<li class="cp-section-wish">\n			<div class="cp-section-wrapper">\n				<div class="cp-section-content">\n					<span class="cp-section-top"></span>\n					<ul class="cp-section-list"></ul>\n					<span class="cp-section-bottom"></span>\n				</div>\n			</div>\n		</li>\n		';
	 } ;
	__p += '\n	</ul>\n</div>';
	
	}
	return __p
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- <footer class="cp-footer"> -->\n	<div class="cp-checkout-btn gs-btn">\n		<span class="cp-checkout-ic">\n			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><path d="M25.4,29H6.6c-1.7,0-3-1.4-2.8-2.9l1.9-13.8C5.9,11,6.6,10,8,10h16c1.4,0,2.1,1,2.3,2.3l1.9,13.8 C28.4,27.6,27.1,29,25.4,29z"/><path d="M10.6,12.7V8.4C10.6,5.4,13,3,16,3h0c3,0,5.4,2.4,5.4,5.4v4.3"/></g></svg>\n		</span>\n		<span class="cp-checkout-label">Checkout</span>\n	</div>\n<!-- </footer> -->';
	
	}
	return __p
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ТИНТ КОНТЕЙНЕРА                                                                         ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var TintView = Backbone.View.extend(
		{
			events: {
				'click' : 'hidePanel'
			},
	
	
			initialize: function (params)
			{
				//..
			}
		});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  INTERACTION                                                                         │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(TintView.prototype,
			{
				/**
				 *	Скрывает панель
				 */
	
				hidePanel: function ()
				{
					Lifecycle.next(LifecycleEvent.HIDE);
				},
	
	
				/**
				 *	Активирует взаимодействие
				 */
	
				activateInteraction: function ()
				{
					this.delegateEvents(this.events);
				},
	
	
				/**
				 *	Деактивирует взаимодействие
				 */
	
				deactivateInteraction: function ()
				{
					this.undelegateEvents();
				},
			});
	
	
	module.exports = TintView;
	
	
	


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var _ = __webpack_require__(2),
		Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Options = __webpack_require__(10),
		Cart = __webpack_require__(7),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6),
		Utils = __webpack_require__(14);
	
	
	/** 
	 *	Require HTML template
	 */
	 
	var	ButtonHTML = __webpack_require__(23);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ПЛАВАЮЩАЯ КНОПКА                                                                        ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		/**
		 *	Состояния кнопки
		 */
	
		var ButtonView = Backbone.View.extend(
		{
			
			/** Interaction events */
	
			events: {
				"click .cb-cart-cell": 'showCartlist',
				"click .cb-wish-cell": 'showWishlist',
			},
	
	
			initialize: function ()
			{
				this.iswish = Options.vars.iswish;
				this.currency = Options.vars.currency;
				this.cartList = Cart.getList('cartlist');
				this.wishList = this.iswish ? Cart.getList('wishlist') : null;
			}
		});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  INTERACTION                                                                         │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(ButtonView.prototype,
			{
				/**
				 *	Открывает панель (корзина)
				 */
	
				showCartlist: function ()
				{
					Lifecycle.next(LifecycleEvent.SHOW, 'cart');
				},
	
	
				/**
				 *	Открывает панель (отложенные товары)
				 */
	
				showWishlist: function ()
				{
					Lifecycle.next(LifecycleEvent.SHOW, 'wish');
				},
	
	
				/**
				 *	Активирует взаимодействие
				 */
	
				activateInteraction: function ()
				{
					this.delegateEvents(this.events);
				},
	
	
				/**
				 *	Деактивирует взаимодействие
				 */
	
				deactivateInteraction: function ()
				{
					this.undelegateEvents();
				},
			});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  RENDERING                                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(ButtonView.prototype,
			{
				/**
				 *	Активирует рендер
				 */
	
				activateRendering: function ()
				{
					this.listenTo(this.cartList, 'reset add destroy change', this.render);
					this.iswish && this.listenTo(this.wishList, 'reset add destroy change', this.render);
	
					this.render();
				},
	
	
				/**
				 *	Деактивирует рендер
				 */
	
				deactivateRendering: function ()
				{
					this.stopListening(this.cartList);
					this.iswish && this.stopListening(this.wishList);
				},
	
	
				/**
				 *	Рендер представления
				 */
	
				render: function ()
				{
					var cartListStats = _.clone(this.cartList.getStats()),
						wishListStats = this.iswish ? _.clone(this.wishList.getStats()) : null;
	
					this.$el.html(ButtonHTML({ 
						iswish: this.iswish, 
						cost: Utils.format(cartListStats.totalCost, this.currency), 
						totalCart: cartListStats.totalItems,
						totalWish: this.iswish ? wishListStats.totalItems : 0
					}));
				}
			});
	
	
	module.exports = ButtonView;
	
	
	


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	
	 if (totalCart > 0 || totalWish > 0) { ;
	__p += '\n<div class="cb-wrapper gs-btn';
	 print( totalWish > 0 && totalCart > 0 ? ' cb-state_both' : (totalCart > 0 ? ' cb-state_cart' : ' cb-state_wish') ) ;
	__p += '">\n	<ul>\n		<li class="cb-cart-cell">\n			<span class="cb-ic">\n				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><path d="M25.4,29H6.6c-1.7,0-3-1.4-2.8-2.9l1.9-13.8C5.9,11,6.6,10,8,10h16c1.4,0,2.1,1,2.3,2.3l1.9,13.8 C28.4,27.6,27.1,29,25.4,29z"/><path d="M10.6,12.7V8.4C10.6,5.4,13,3,16,3h0c3,0,5.4,2.4,5.4,5.4v4.3"/></g></svg>\n			</span>\n			<span class="cb-label">';
	 print(cost) ;
	__p += '</span>\n		</li>\n		';
	 if (iswish && totalWish > 0) { ;
	__p += '\n		<li class="cb-wish-cell">\n			<span class="cb-ic">\n				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><path d="M22.6,6.5c-2.9,0-5.4,1.7-6.6,4.1c-1.2-2.4-3.7-4.1-6.6-4.1C5.3,6.5,2,9.8,2,13.9C2,23.7,15.8,29,15.8,29S30,23.6,30,13.9C30,9.8,26.7,6.5,22.6,6.5L22.6,6.5z"/></svg>\n			</span>\n		</li>\n		';
	 } ;
	__p += '\n	</ul>\n	';
	 if (totalCart > 0) { ;
	__p += '\n	<span class="cb-counter">\n		<span class="cb-counter-label">';
	 print(totalCart) ;
	__p += '</span>\n	</span>\n	';
	 } ;
	__p += '\n</div>\n';
	 } ;
	__p += '\n\n\n\n';
	
	}
	return __p
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- Cart Wrapper -->\n<div class="cart-wrapper">\n	<div class="cart-panel gs-panel"></div>\n	<div class="cart-tint gs-tint"></div>\n	<div class="cart-button"></div>\n</div>';
	
	}
	return __p
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  font-size: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody,\ndiv,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\nth,\ntd,\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  box-sizing: content-box;\n  /* 2 */\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\ntextarea {\n  overflow: auto;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd,\nth {\n  padding: 0;\n}\n/* 1 */\n/*img[src*=\".svg\"] { \n\t\twidth: 100%;\n\t}*/\n/* 2 */\n/*@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n\t\timg[src*=\".svg\"] {\n\t\t\twidth: 100%; \n\t\t}\n\t}*/\n/**\n\t\t * BODY COMMON STYLE\n\t\t */\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n}\nbody.blocked {\n  overflow: hidden;\n}\n.cart-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 16px;\n  font-family: 'Montserrat', sans-serif;\n  font-weight: 400;\n  letter-spacing: -0.02em;\n  color: #262626;\n  z-index: 100000;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n/**\n\t\t *\tPrimary color\n\t\t */\n.p-color {\n  background-color: #111111;\n}\n/**\n\t\t *\tButton\n\t\t */\n.gs-btn {\n  background-color: #111111;\n  color: #ffffff;\n  cursor: pointer;\n  -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n}\n.gs-btn svg {\n  stroke: #ffffff;\n}\n.gs-btn:hover {\n  background-color: #292929;\n  color: #ffffff;\n}\n.gs-btn:hover svg {\n  stroke: #ffffff;\n}\n/**\n\t\t *\tTint\n\t\t */\n.gs-tint {\n  background-color: rgba(0, 0, 0, 0.9);\n}\n/**\n\t\t *\tPanel\n\t\t */\n.gs-panel {\n  background-color: #f5f5f5;\n}\n.gs-tabs {\n  background-color: rgba(255, 255, 255, 0.9);\n  color: #262626;\n}\n.gs-tabs svg {\n  stroke: #262626;\n}\n.gs-tabs .gs-tab-selected {\n  color: #424346;\n  cursor: default;\n}\n.gs-tabs .gs-tab-selected svg {\n  stroke: #424346;\n}\n.gs-container {\n  color: #bdc3c7;\n}\n.gs-item {\n  background-color: #ffffff;\n}\n.gs-item .gs-item-price {\n  color: #a8a8b2;\n}\n.gs-item .gs-item-label {\n  color: #111111;\n}\n.gs-item svg {\n  stroke: #bdc3c7;\n}\n.iScrollVerticalScrollbar {\n  position: absolute;\n  z-index: 9999;\n  width: 0.25em;\n  bottom: 0.5em;\n  top: 0.5em;\n  right: 0.125em;\n  overflow: hidden;\n  margin: 0.25em 0em;\n  margin-top: 3.5em;\n}\n.iScrollVerticalScrollbar.iScrollBothScrollbars {\n  bottom: 0.5em;\n}\n.iScrollIndicator {\n  position: absolute;\n  background: rgba(38, 38, 38, 0.2);\n  border-radius: 2px;\n}\n.iScrollVerticalScrollbar .iScrollIndicator {\n  width: 100%;\n  background: rgba(38, 38, 38, 0.5);\n}\n@media screen and (min-width: 20em) {\n  .iScrollVerticalScrollbar {\n    margin-top: 4.25em;\n  }\n}\n@media (min-width: 26.25em) and (max-height: 26em) {\n  .iScrollVerticalScrollbar {\n    margin-top: 3em;\n  }\n}\n.cart-panel {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  min-width: 17.5em;\n  display: none;\n  position: fixed;\n  z-index: 30;\n  -webkit-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n/** 550 */\n@media screen and (min-width: 34.375em) {\n  .cart-panel {\n    width: 34.375em;\n  }\n}\n/** 1024 */\n@media screen and (min-width: 64em) {\n  .cart-panel {\n    width: 40em;\n  }\n}\n.cp-header {\n  width: 100%;\n  height: 3em;\n  position: absolute;\n  z-index: 20;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.cp-header ul {\n  width: 100%;\n  height: 100%;\n  display: table;\n}\n.cp-header li {\n  height: 100%;\n  position: relative;\n  display: table-cell;\n  white-space: nowrap;\n}\n.cp-tab-ic {\n  margin-right: 0.125em;\n  vertical-align: middle;\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n}\n.cp-tab-ic svg {\n  fill: none;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n.cp-tab-label {\n  vertical-align: middle;\n  display: inline-block;\n  font-size: 0.875em;\n  line-height: 1em;\n}\n/*.cp-section_cart .cart-tab, .cp-section_wish .wish-tab {\n\t\t\tcursor: default;\n\n\t\t\t.cp-tab-label {\n\t\t\t\tcolor: @panel-selected-color;\n\t\t\t}\n\n\t\t\t.cp-tab-ic {\n\t\t\t\tsvg {\n\t\t\t\t\tstroke: @panel-selected-color;\n\t\t\t\t}\n\t\t\t}\n\t\t}*/\n.cp-back {\n  width: 3em;\n  cursor: pointer;\n}\n.cp-back .cp-tab-ic {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(0.625em, -50%);\n  -moz-transform: translate(0.625em, -50%);\n  -ms-transform: translate(0.625em, -50%);\n  -o-transform: translate(0.625em, -50%);\n  transform: translate(0.625em, -50%);\n}\n.cp-back:hover .cp-tab-ic {\n  -webkit-transform: translate(0.5em, -50%);\n  -moz-transform: translate(0.5em, -50%);\n  -ms-transform: translate(0.5em, -50%);\n  -o-transform: translate(0.5em, -50%);\n  transform: translate(0.5em, -50%);\n}\n.cp-tab-wrapper {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.cp-tabs li {\n  cursor: pointer;\n}\n.cp-tabs li.selected {\n  cursor: default;\n}\n.cp-tab-cursor {\n  width: 50%;\n  height: 0.125em;\n  top: 0;\n  left: 0;\n  position: absolute;\n  -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -moz-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -o-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n}\n.cp-section_cart .cp-tab-cursor {\n  -webkit-transform: translateX(0);\n  -moz-transform: translateX(0);\n  -ms-transform: translateX(0);\n  -o-transform: translateX(0);\n  transform: translateX(0);\n}\n.cp-section_wish .cp-tab-cursor {\n  -webkit-transform: translateX(100%);\n  -moz-transform: translateX(100%);\n  -ms-transform: translateX(100%);\n  -o-transform: translateX(100%);\n  transform: translateX(100%);\n}\n@media screen and (min-width: 20em) {\n  .cp-header {\n    height: 3.75em;\n  }\n  .cp-back {\n    width: 3.75em;\n  }\n  .cp-back .cp-tab-ic {\n    -webkit-transform: translate(1.125em, -50%);\n    -moz-transform: translate(1.125em, -50%);\n    -ms-transform: translate(1.125em, -50%);\n    -o-transform: translate(1.125em, -50%);\n    transform: translate(1.125em, -50%);\n  }\n  .cp-back:hover .cp-tab-ic {\n    -webkit-transform: translate(1em, -50%);\n    -moz-transform: translate(1em, -50%);\n    -ms-transform: translate(1em, -50%);\n    -o-transform: translate(1em, -50%);\n    transform: translate(1em, -50%);\n  }\n  .cp-tab-ic {\n    margin-right: 0.25em;\n    width: 1.1875em;\n    height: 1.1875em;\n  }\n  .cp-tab-label {\n    font-size: 1em;\n    line-height: 1.25em;\n  }\n}\n/**\n\t\t * PORTRAIT MOBILE MODE (~416px)\n\t\t */\n@media (min-width: 26.25em) and (max-height: 26em) {\n  .cp-header {\n    height: 2.5em;\n  }\n  .cp-back {\n    width: 2.5em;\n  }\n  .cp-back .cp-tab-ic {\n    -webkit-transform: translate(0.625em, -50%);\n    -moz-transform: translate(0.625em, -50%);\n    -ms-transform: translate(0.625em, -50%);\n    -o-transform: translate(0.625em, -50%);\n    transform: translate(0.625em, -50%);\n  }\n  .cp-back:hover .cp-tab-ic {\n    -webkit-transform: translate(0.5em, -50%);\n    -moz-transform: translate(0.5em, -50%);\n    -ms-transform: translate(0.5em, -50%);\n    -o-transform: translate(0.5em, -50%);\n    transform: translate(0.5em, -50%);\n  }\n  .cp-tab-ic {\n    margin-right: 0.125em;\n    width: 1em;\n    height: 1em;\n  }\n  .cp-tab-label {\n    font-size: 0.875em;\n    line-height: 1em;\n  }\n}\n.cp-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n.cp-container ul {\n  list-style-type: none;\n}\n.cp-container > ul {\n  width: 100%;\n  height: 100%;\n  display: table;\n  position: relative;\n}\n.cp-container > ul > li {\n  height: 100%;\n  width: 50%;\n  position: relative;\n  display: table-cell;\n}\n.cp-container > ul.cp-sections {\n  width: 200%;\n}\n.cp-container > ul {\n  -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -moz-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -o-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n}\n.cp-section_cart .cp-container > ul {\n  -webkit-transform: translateX(0);\n  -moz-transform: translateX(0);\n  -ms-transform: translateX(0);\n  -o-transform: translateX(0);\n  transform: translateX(0);\n}\n.cp-section_wish .cp-container > ul {\n  -webkit-transform: translateX(-50%);\n  -moz-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  -o-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n.cp-section-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  /* Prevent native touch events on Windows */\n  -ms-touch-action: none;\n  /* Prevent the callout on tap-hold and text selection */\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  /* Prevent text resize on orientation change, useful for web-apps */\n  -webkit-text-size-adjust: none;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  -o-text-size-adjust: none;\n  text-size-adjust: none;\n}\n.cp-section-content {\n  position: absolute;\n  width: 100%;\n  /* Prevent elements to be highlighted on tap */\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  /* Put the scroller into the HW Compositing layer right from the start */\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n}\n.cp-section-top,\n.cp-section-bottom {\n  display: block;\n}\n.cp-section-top {\n  height: 3.625em;\n}\n.cp-section-cart .cp-section-bottom {\n  height: 3.5em;\n}\n.cp-section-wish .cp-section-bottom {\n  height: 0em;\n}\n.cp-section-list {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0 0.625em;\n}\n.cp-section-list > li {\n  margin-bottom: 0.625em;\n}\n.cp-item-wrapper {\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  -webkit-border-radius: 20px;\n  -moz-border-radius: 20px;\n  border-radius: 20px;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -webkit-transform: translateY(10%);\n  -moz-transform: translateY(10%);\n  -ms-transform: translateY(10%);\n  -o-transform: translateY(10%);\n  transform: translateY(10%);\n  opacity: 0;\n}\n.cp-item-wrapper.active {\n  -webkit-transform: translateY(0%);\n  -moz-transform: translateY(0%);\n  -ms-transform: translateY(0%);\n  -o-transform: translateY(0%);\n  transform: translateY(0%);\n  opacity: 1;\n}\n.cp-item-img {\n  width: 100%;\n  padding-bottom: 100%;\n  background-repeat: no-repeat;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n/** CART ITEM BLOCK */\n.cp-item-block-wrapper {\n  width: 100%;\n  height: 5em;\n  display: table;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n.cp-item-block-wrapper > div {\n  position: relative;\n  display: table-cell;\n}\n.cp-item-description > span {\n  position: absolute;\n  padding: 0 1.125em;\n  top: 50%;\n  -webkit-transform: translate(0, -50%);\n  -moz-transform: translate(0, -50%);\n  -ms-transform: translate(0, -50%);\n  -o-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n}\n.cp-item-label {\n  line-height: 1.3em;\n  max-height: 2.6em;\n  font-size: 0.875em;\n  overflow: hidden;\n  display: block;\n}\n.cp-item-price {\n  font-size: 0.875em;\n  display: block;\n  margin-top: 0.125em;\n}\n.cp-item-cart,\n.cp-item-wish,\n.cp-item-trash {\n  width: 2.5em;\n  cursor: pointer;\n}\n.cp-item-trash .cp-item-ic {\n  transform: translate(-16px, -50%);\n  left: auto;\n  right: 0;\n}\n.cp-item-ic {\n  position: absolute;\n  display: inline-block;\n  width: 0.9375em;\n  height: 0.9375em;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.cp-item-ic svg {\n  fill: none;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n.cp-empty-section {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -webkit-transform: translateY(1em);\n  -moz-transform: translateY(1em);\n  -ms-transform: translateY(1em);\n  -o-transform: translateY(1em);\n  transform: translateY(1em);\n  opacity: 0;\n}\n.cp-empty-section.active {\n  -webkit-transform: translateY(0%);\n  -moz-transform: translateY(0%);\n  -ms-transform: translateY(0%);\n  -o-transform: translateY(0%);\n  transform: translateY(0%);\n  opacity: 1;\n}\n.cp-empty-section-label {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  font-size: 0.875em;\n  white-space: nowrap;\n}\n@media screen and (min-width: 20em) {\n  .cp-section-top {\n    height: 4.375em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 5em;\n  }\n  .cp-item-ic {\n    width: 1.5em;\n    height: 1.5em;\n  }\n  .cp-item-cart,\n  .cp-item-wish,\n  .cp-item-trash {\n    width: 3em;\n  }\n}\n@media screen and (min-width: 22.5em) {\n  .cp-section-top {\n    height: 5em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 5em;\n  }\n  .cp-section-wish .cp-section-bottom {\n    height: 0em;\n  }\n  .cp-section-list {\n    padding: 0 1.25em;\n  }\n  .cp-section-list > li {\n    margin-bottom: 1.25em;\n  }\n  .cp-item-label {\n    line-height: 1.3em;\n    max-height: 2.6em;\n    font-size: 1em;\n  }\n  .cp-item-price {\n    font-size: 1em;\n  }\n}\n@media screen and (min-width: 26.25em) {\n  .cp-section-list {\n    padding: 0 0.625em;\n  }\n  .cp-section-list > li {\n    margin-bottom: 0.125em;\n  }\n  .cp-section-top {\n    height: 4.375em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 6.125em;\n  }\n  .cp-section-wish .cp-section-bottom {\n    height: 0.5em;\n  }\n  .cp-item-wrapper {\n    height: 5em;\n    display: table;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    border-radius: 5px;\n    /** CART ITEM IMG */\n  }\n  .cp-item-wrapper > div {\n    display: table-cell;\n  }\n  .cp-item-wrapper .cp-item-img {\n    width: 5em;\n    padding: 0;\n    display: table-cell;\n  }\n  .cp-item-ic {\n    width: 0.9375em;\n    height: 0.9375em;\n  }\n  .cp-item-label {\n    line-height: 1.3em;\n    max-height: 2.6em;\n    font-size: 0.875em;\n  }\n  .cp-item-price {\n    font-size: 0.875em;\n  }\n  .cp-item-cart,\n  .cp-item-wish,\n  .cp-item-trash {\n    width: 2.5em;\n  }\n}\n/**\n\t\t * PORTRAIT MOBILE MODE (~416px)\n\t\t */\n@media (min-width: 26.25em) and (max-height: 26em) {\n  .cp-section-top {\n    height: 3.125em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 4em;\n  }\n}\n@media screen and (min-width: 30em) {\n  .cp-section-list {\n    padding: 0 1.25em;\n  }\n  .cp-section-list > li {\n    margin-bottom: 0.25em;\n  }\n  .cp-section-top {\n    height: 5em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 6.625em;\n  }\n  .cp-section-wish .cp-section-bottom {\n    height: 1em;\n  }\n  .cp-item-cart,\n  .cp-item-wish,\n  .cp-item-trash {\n    width: 3em;\n  }\n  .cp-item-ic {\n    width: 1.25em;\n    height: 1.25em;\n  }\n}\n/**\n\t\t * PORTRAIT MOBILE MODE (~480px)\n\t\t */\n@media (min-width: 30em) and (max-height: 26em) {\n  .cp-section-top {\n    height: 3.75em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 4.5em;\n  }\n}\n@media screen and (min-width: 64em) {\n  .cp-item-ic {\n    width: 1.375em;\n    height: 1.375em;\n  }\n  .cp-section-list {\n    padding: 0 1.875em;\n  }\n  .cp-section-list > li {\n    margin-bottom: 0.25em;\n  }\n  .cp-section-top {\n    height: 5.625em;\n  }\n  .cp-section-cart .cp-section-bottom {\n    height: 7.25em;\n  }\n  .cp-section-wish .cp-section-bottom {\n    height: 1.625em;\n  }\n  .cp-item-block-wrapper {\n    height: 7.5em;\n  }\n  .cp-item-wrapper {\n    height: 7.5em;\n    /** CART ITEM IMG */\n  }\n  .cp-item-wrapper .cp-item-img {\n    width: 7.5em;\n  }\n  .cp-item-label {\n    line-height: 1.3em;\n    max-height: 2.6em;\n    font-size: 1em;\n  }\n  .cp-item-price {\n    font-size: 1em;\n  }\n  .cp-item-cart,\n  .cp-item-wish,\n  .cp-item-trash {\n    width: 3.75em;\n  }\n  .cp-item-trash .cp-item-ic {\n    left: 50%;\n    right: auto;\n    transform: translate(-50%, -50%);\n  }\n}\n/*.cp-footer {\n\n\t}*/\n.cp-checkout-btn {\n  position: absolute;\n  z-index: 30;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 2.5em;\n  height: 2.5em;\n  -webkit-border-radius: 1.25em;\n  -moz-border-radius: 1.25em;\n  border-radius: 1.25em;\n  bottom: 1em;\n  left: 50%;\n  -webkit-transform: translate(-50%, 0);\n  -moz-transform: translate(-50%, 0);\n  -ms-transform: translate(-50%, 0);\n  -o-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  /*&:hover {\n\t\t\t\tbackground-color: @checkout-color-hover;\n\t\t\t}*/\n  -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -moz-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -o-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -webkit-transition-property: width, height, bottom, -webkit-border-radius, -webkit-transform, opacity;\n  -moz-transition-property: width, height, bottom, border-radius, -moz-transform, opacity;\n  -o-transition-property: width, height, bottom, border-radius, -o-transform, opacity;\n  transition-property: width, height, bottom, border-radius,-webkit-transform,-moz-transform,-o-transform,transform, opacity;\n  -webkit-transition-delay: 0s;\n  -moz-transition-delay: 0s;\n  -o-transition-delay: 0s;\n  transition-delay: 0s;\n}\n.cp-checkout-btn.hidden {\n  -webkit-transition-delay: 0s;\n  -moz-transition-delay: 0s;\n  -o-transition-delay: 0s;\n  transition-delay: 0s;\n  -webkit-transform: translate(-50%, 300%);\n  -moz-transform: translate(-50%, 300%);\n  -ms-transform: translate(-50%, 300%);\n  -o-transform: translate(-50%, 300%);\n  transform: translate(-50%, 300%);\n  opacity: 0;\n}\n.cp-checkout-label {\n  display: none;\n}\n.cp-checkout-ic {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  display: block;\n  width: 1em;\n  height: 1em;\n}\n.cp-checkout-ic svg {\n  fill: none;\n  stroke: #ffffff;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n@media screen and (min-width: 20em) {\n  .cp-checkout-ic {\n    width: 1.5em;\n    height: 1.5em;\n  }\n  .cp-checkout-btn {\n    width: 3.75em;\n    height: 3.75em;\n    -webkit-border-radius: 1.875em;\n    -moz-border-radius: 1.875em;\n    border-radius: 1.875em;\n    bottom: 1.25em;\n  }\n}\n@media screen and (min-width: 26.25em) {\n  .cp-checkout-ic {\n    display: none;\n  }\n  .cp-checkout-btn {\n    width: 15.625em;\n    height: 3.125em;\n    bottom: 2.5em;\n  }\n  .cp-checkout-label {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -moz-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    display: block;\n    color: #ffffff;\n    font-size: 0.875em;\n    text-transform: uppercase;\n  }\n}\n/**\n\t\t * PORTRAIT MOBILE MODE (~416px)\n\t\t */\n@media (min-width: 26.25em) and (max-height: 26em) {\n  .cp-checkout-btn {\n    bottom: 1em;\n    width: 11.25em;\n    height: 2.5em;\n  }\n  .cp-checkout-label {\n    font-size: 0.75em;\n  }\n}\n.cart-tint {\n  width: 100%;\n  height: 100%;\n  display: none;\n  position: fixed;\n  z-index: 20;\n}\n.cart-button {\n  position: fixed;\n  left: auto;\n  top: 1.5em;\n  right: 1.5em;\n  bottom: auto;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  display: none;\n  z-index: 10;\n}\n.cb-wrapper {\n  width: 2.5em;\n  height: 2.5em;\n  position: relative;\n  -webkit-border-radius: 1.25em;\n  -moz-border-radius: 1.25em;\n  border-radius: 1.25em;\n  /*&:hover {\n\t\t\t\tbackground-color: @button-color-hover;\n\t\t\t}*/\n}\n.cb-wrapper ul {\n  display: table;\n  list-style-type: none;\n  height: 100%;\n  width: 100%;\n}\n.cb-wrapper li {\n  display: table-cell;\n  height: 100%;\n}\n.cb-ic {\n  width: 1.125em;\n  height: 1.125em;\n  position: absolute;\n  display: inline-block;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.cb-ic svg {\n  fill: none;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n.cb-label {\n  display: none;\n}\n.cb-wrapper.cb-state_both .cb-wish-cell,\n.cb-wrapper.cb-state_cart .cb-wish-cell {\n  display: none;\n}\n.cb-wrapper.cb-state_wish .cb-cart-cell {\n  display: none;\n}\n.cb-counter {\n  width: 1.25em;\n  height: 1.25em;\n  position: absolute;\n  display: inline-block;\n  right: -12%;\n  top: -12%;\n  background-color: #ffffff;\n  color: #424346;\n  -webkit-border-radius: 0.625em;\n  -moz-border-radius: 0.625em;\n  border-radius: 0.625em;\n  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);\n  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  z-index: 10;\n}\n.cb-counter-label {\n  position: absolute;\n  display: inline-block;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  font-size: 0.6875em;\n}\n@media screen and (min-width: 20em) {\n  .cb-ic {\n    width: 1.5em;\n    height: 1.5em;\n  }\n  .cb-wrapper {\n    width: 3.75em;\n    height: 3.75em;\n    -webkit-border-radius: 1.875em;\n    -moz-border-radius: 1.875em;\n    border-radius: 1.875em;\n  }\n  .cb-counter {\n    width: 1.625em;\n    height: 1.625em;\n    right: -0.25em;\n    top: -0.25em;\n    -webkit-border-radius: 0.8125em;\n    -moz-border-radius: 0.8125em;\n    border-radius: 0.8125em;\n  }\n  .cb-counter-label {\n    font-size: 0.75em;\n  }\n}\n@media screen and (min-width: 26.25em) {\n  .cb-wrapper.cb-state_both,\n  .cb-wrapper.cb-state_cart {\n    width: auto;\n    height: 3.125em;\n    -webkit-border-radius: 1.5625em;\n    -moz-border-radius: 1.5625em;\n    border-radius: 1.5625em;\n  }\n  .cb-wrapper.cb-state_both ul > li,\n  .cb-wrapper.cb-state_cart ul > li {\n    padding: 0 1em;\n    padding-top: 0.875em;\n  }\n  .cb-wrapper.cb-state_both .cb-ic,\n  .cb-wrapper.cb-state_cart .cb-ic {\n    width: 1.25em;\n    height: 1.25em;\n    position: relative;\n    display: inline-block;\n    top: auto;\n    left: auto;\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0);\n  }\n  .cb-wrapper.cb-state_both .cb-label,\n  .cb-wrapper.cb-state_cart .cb-label {\n    display: inline-block;\n    font-size: 0.875em;\n    -webkit-transform: translate(0, 0.125em);\n    -moz-transform: translate(0, 0.125em);\n    -ms-transform: translate(0, 0.125em);\n    -o-transform: translate(0, 0.125em);\n    transform: translate(0, 0.125em);\n    vertical-align: top;\n    padding-left: 0.25em;\n  }\n  .cb-counter {\n    right: -0.375em;\n    top: -0.375em;\n  }\n}\n@media screen and (min-width: 48em) {\n  .cb-wrapper.cb-state_both .cb-wish-cell {\n    display: table-cell;\n  }\n  .cb-wrapper.cb-state_both .cb-cart-cell {\n    padding-right: 0;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 27 */
/***/ function(module, exports) {

	/*
		MIT License https://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License https://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var $ = __webpack_require__(1),
		Backbone = __webpack_require__(3),
		webfont = __webpack_require__(9);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  HOOKS                                                                                   ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var Hooks = function () 
		{
	
			// СЛУШАЕТ СОБЫТИЯ LIFECYCLE
			// ---------------------------------------------------------------------------------
	
			this.listenTo(Lifecycle, LifecycleEvent.SHOW, this._onshow);
			this.listenTo(Lifecycle, LifecycleEvent.HIDE, this._onhide);
		};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ОБРАБОТЧИКИ СОБЫТИЙ LYFECYCLE                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Hooks.prototype,
			{
				/** Показывает панель */
	
				_onshow: function ()
				{
					document.body.addEventListener('touchmove', this._ontouchmove);
					$('body').addClass('blocked');
				},
	
				_ontouchmove: function (e)
				{
					if (!$(e.target).hasClass("scrollable")) {
						e.preventDefault();
					}
				},
	
	
				/** 
				 *	Скрывает панель
				 */
	
				_onhide: function ()
				{
					document.body.removeEventListener('touchmove', this._ontouchmove);
					$('body').removeClass('blocked');
				}
			});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ..                                                                                  │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Hooks.prototype,
			{
				destroy: function ()
				{
					this.stopListening();
					document.body.removeEventListener('touchmove', this._ontouchmove);
					$('body').removeClass('block');
				}
			});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  РАСШИРЯЕТ BACKBONE EVENTS                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Hooks.prototype, Backbone.Events);
	
	
	module.exports = Hooks;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Cart = __webpack_require__(7),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6),
		Utils = __webpack_require__(14);
	
	
	/** 
	 *	Require component
	 */
	 
	var Options = __webpack_require__(10);
	
	
	/** 
	 *	Require HTML template
	 */
	 
	var	ItemHTML = __webpack_require__(33);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ПРЕДСТАВЛЕНИЕ ПРОДУКТА                                                                  ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var CartSectionItem = Backbone.View.extend(
		{
			tagName: "li",
			model: Cart.Item,
	
			events: {
				'click .cp-item-trash': 'trash',
				'click .cp-item-wish': 'copyToWish'
			},
	
			initialize: function () {
				this.currency = Options.vars.currency;
				this.listenTo(this.model, 'destroy', this.remove);
				this.listenTo(this.model, 'change:quantity', this.render);
			},
	
			trash: function ()
			{
				this.model.destroy();
			},
	
			copyToWish: function ()
			{
				var m = this.model.clone();
	
				Cart.addTo('wishlist', m);
			}
		});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  RENDERING                                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(CartSectionItem.prototype,
			{
				/**
				 *	Рендер представления
				 */
	
				render: function ()
				{
					if (this.model.changed.id !== undefined) {
						return;
					}
	
					var m = this.model.toJSON();
						m.price = Utils.format(m.price, this.currency);
						m.iswish = Options.vars.iswish;
	
					this.$el.html(ItemHTML(m));
	
					return this;
				}
			});
	
	
	module.exports = CartSectionItem;
	
	
	


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
	
	
	/** 
	 *	Require third-party library
	 */
	
	var Backbone = __webpack_require__(3);
	
	
	/** 
	 *	Require base
	 */
	 
	var	Cart = __webpack_require__(7),
		Lifecycle = __webpack_require__(5),
		LifecycleEvent = __webpack_require__(6),
		Utils = __webpack_require__(14);
	
	
	/** 
	 *	Require component
	 */
	 
	var Options = __webpack_require__(10);
	
	
	/** 
	 *	Require HTML template
	 */
	 
	var	ItemHTML = __webpack_require__(34);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ПРЕДСТАВЛЕНИЕ ПРОДУКТА                                                                  ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
		var WishSectionItem = Backbone.View.extend(
		{
			tagName: "li",
			model: Cart.Item,
	
			events: {
				'click .cp-item-trash': 'trash',
				'click .cp-item-cart': 'copyToCart'
			},
	
			initialize: function () {
				this.currency = Options.vars.currency;
				this.listenTo(this.model, 'destroy', this.remove);
				this.listenTo(this.model, 'change:quantity', this.render);
			},
	
			trash: function ()
			{
				this.model.destroy();
			},
	
			copyToCart: function ()
			{
				var m = this.model.clone();
	
				Cart.addTo('cartlist', m);
			}
		});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  RENDERING                                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(WishSectionItem.prototype,
			{
				/**
				 *	Рендер представления
				 */
	
				render: function ()
				{
					if (this.model.changed.id !== undefined) {
						return;
					}
	
					var m = this.model.toJSON();
						m.price = Utils.format(m.price, this.currency)
	
					this.$el.html(ItemHTML(m));
	
					return this;
				}
			});
	
	
	module.exports = WishSectionItem;
	
	
	


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="cp-item-wrapper gs-item">\n	<div class="cp-item-img" style="background-image: url(\'' +
	((__t = (img)) == null ? '' : __t) +
	'\');"></div>\n	<div class="cp-item-block">\n		<div class="cp-item-block-wrapper">\n			<div class="cp-item-description">\n				<span>\n					<span class="cp-item-label gs-item-label">' +
	((__t = (title)) == null ? '' : __t) +
	'</span>\n					<span class="cp-item-price gs-item-price">' +
	((__t = (price)) == null ? '' : __t) +
	'</span>\n				</span>\n			</div>\n			';
	 if (iswish) { ;
	__p += '\n			<div class="cp-item-wish">\n				<span class="cp-item-ic">\n					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <path d="M22.6,6.5c-2.9,0-5.4,1.7-6.6,4.1c-1.2-2.4-3.7-4.1-6.6-4.1C5.3,6.5,2,9.8,2,13.9C2,23.7,15.8,29,15.8,29 S30,23.6,30,13.9C30,9.8,26.7,6.5,22.6,6.5L22.6,6.5z"/></svg>\n				</span>\n			</div>\n			';
	 } ;
	__p += '\n			<div class="cp-item-trash">\n				<span class="cp-item-ic">\n					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><g><line x1="7" y1="7" x2="25" y2="25"/><g><line x1="25" y1="7" x2="7" y2="25"/></g></g></g></svg>\n				</span>\n			</div>\n		</div>\n	</div>\n</div>';
	
	}
	return __p
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="cp-item-wrapper gs-item">\n	<div class="cp-item-img" style="background-image: url(\'' +
	((__t = (img)) == null ? '' : __t) +
	'\');"></div>\n	<div class="cp-item-block">\n		<div class="cp-item-block-wrapper">\n			<div class="cp-item-description">\n				<span>\n					<span class="cp-item-label gs-item-label">' +
	((__t = (title)) == null ? '' : __t) +
	'</span>\n					<span class="cp-item-price gs-item-price">' +
	((__t = (price)) == null ? '' : __t) +
	'</span>\n				</span>\n			</div>\n			<div class="cp-item-cart">\n				<span class="cp-item-ic">\n					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><path d="M25.4,29H6.6c-1.7,0-3-1.4-2.8-2.9l1.9-13.8C5.9,11,6.6,10,8,10h16c1.4,0,2.1,1,2.3,2.3l1.9,13.8 C28.4,27.6,27.1,29,25.4,29z"/><path d="M10.6,12.7V8.4C10.6,5.4,13,3,16,3h0c3,0,5.4,2.4,5.4,5.4v4.3"/></g></svg>\n				</span>\n			</div>\n			<div class="cp-item-trash">\n				<span class="cp-item-ic">\n					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><g><line x1="7" y1="7" x2="25" y2="25"/><g><line x1="25" y1="7" x2="7" y2="25"/></g></g></g></svg>\n				</span>\n			</div>\n		</div>\n	</div>\n</div>';
	
	}
	return __p
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="cp-empty-section">\n	<span class="cp-empty-section-label">';
	 print(message) ;
	__p += '</span>\n</div>';
	
	}
	return __p
	};

/***/ }
 ]);
//# sourceMappingURL=cart.modern.0.5.0.js.map


var cart = new CartModule({ 
				iswish: true, 
				ismultiple: false 
			});

			//console.log(cart);

			$('.add-to-cart').click(function() {
				cart.addToCart($(this).prev().data());
			});
			
			$('.add-to-wish').click(function() {
				cart.addToWish($(this).prev().prev().data());
			});